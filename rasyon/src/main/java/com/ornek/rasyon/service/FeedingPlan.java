package com.ornek.rasyon.service;

import com.ornek.rasyon.model.Animal;
import com.ornek.rasyon.model.FeedingGuideline;
import com.ornek.rasyon.model.Gender;
import com.ornek.rasyon.repository.FeedingGuidelineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FeedingPlan {

    @Autowired
    private FeedingGuidelineRepository guidelineRepo;

    public Map<String, BigDecimal> calculateRation(Animal animal) {
        BigDecimal weight     = BigDecimal.valueOf(animal.getWeight());
        int        age        = animal.getAge();
        Gender     gender     = animal.getGender();
        boolean    isPregnant = animal.isPregnant();

        // 1) DB’den normal (gebelik=false) rasyonları getir
        List<FeedingGuideline> normalList = guidelineRepo.findFor(
                weight, age, gender, false
        );

        // temel map: yem adı -> miktar
        Map<String, BigDecimal> result = normalList.stream()
                .collect(Collectors.toMap(
                        g -> g.getFeedItem().getName(),
                        FeedingGuideline::getAmountKgPerDay
                ));

        // 2) Erkekler için özel kural
        if (gender == Gender.MALE) {
            if (age >= 15 && age <= 24) {
                // 15–24 ay arası: 376 kg’dan sonraki her 10 kg için %5 artış
                BigDecimal baseWeight = BigDecimal.valueOf(376);
                if (weight.compareTo(baseWeight) > 0) {
                    BigDecimal diff = weight.subtract(baseWeight);
                    BigDecimal increments = diff
                            .divide(BigDecimal.TEN, 2, RoundingMode.FLOOR);
                    BigDecimal gainPercent = increments
                            .multiply(BigDecimal.valueOf(0.05));
                    // tüm yemleri %gainPercent artır
                    result.replaceAll((feed, amt) ->
                            amt
                                    .add(amt.multiply(gainPercent))
                                    .setScale(2, RoundingMode.HALF_UP)
                    );
                }
            } else if (age > 24) {
                // 24 aydan büyükler: sabit değerler
                result.clear();
                result.put("Saman",  BigDecimal.valueOf(2));
                result.put("Yonca",  BigDecimal.valueOf(1));
                result.put("Besi yemi", BigDecimal.valueOf(12));
            }
        }

        // 3) Eğer gebe ise, gebelik tablolarındaki değerlerle override et
        if (isPregnant) {
            List<FeedingGuideline> pregList = guidelineRepo.findFor(
                    weight, age, gender, true
            );
            for (FeedingGuideline g : pregList) {
                result.put(
                        g.getFeedItem().getName(),
                        g.getAmountKgPerDay()
                );
            }
        }

        return result;
    }
}
