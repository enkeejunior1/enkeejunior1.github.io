---
layout: post
title: Why Robust Generalization in Deep Learning is Difficult - Perspective of Expressive Power
subtitle: we need num_parameters $>\exp(\mathcal{O}(k))$ for robust generalization.
tags: [review] [model complexity]
comments: true
---

Article [Link](https://arxiv.org/pdf/2205.13863.pdf)

NN 의 일반화 성능이 발현되기 위해선 parameter 수가 $\exp(\mathcal{O}(n))$ 보다 커야한다는 논문이다.

[A Universal Law of Robustness via Isoperimetry](https://arxiv.org/pdf/2105.12806.pdf) 에서도 regression 문제에 대해서 over-parameterization 이 필요함을 보이는데 해당 논문에서는 robust test error 를 직접 다루지 않는다는 측면에서 구분된다.

# Abstrct

NN 은 adversarial example 에 취약한 것으로 알려져있다. 이를 해결하기 위해 다양한 학습 알고리즘이 제안됐지만, 여전히 일반화 에러를 줄이는 것은 어렵다.

이번 논문에서는 이에 대한 원인을 DNN 의 expressive power 의 관점에서 이론적으로 이해하고자 한다. 구체적으로, 이진 분류 과제를 위한 ReLU 신경망에 대해서 mild over-parameterization 만으로도 충분히 높은 training accuracy 를 보이나 generalization gap 은 줄이지 못함을 보인다.

이를 해결하기 위해선 data dimension $d$ 에 대해서 $\exp(\mathcal{O}(n))$ 개 이상의 parameter 를 갖거나, 데이터가 놓인 Manifold 의 intrinsic dimension $k$ 에 대해서 $\exp(\mathcal{O}(k))$ 개 이상의 parameter 를 가져야 함을 보였다.

이번 논문의 contribution 은 3가지다.

1. Given $\mathcal{D}$

# Introduction

adversarial example 이 발견된 이후로, robust learning 을 위한 다양한 방법들이 제안됐다. 그러나, 여전히 대부분의 방법이 large robust test error 를 겪는다.

*robustness-accuracy tradeoff* 는 이렇게 실험적으로 존재할 뿐만 아니라 이론적으로도 지금까지 검토됐다. 이번 연구에서는 Yang et al. (2020) 가 제시한 조건인 well-seperated condition 에서도 robust classifier 는 non-robust 보다 exponentially complex 한 모델임을 보이고자 한다. 여기서 well-seperated condition 은 robust classifier 존재성의 필요조건이다. 



# Claim 1: Features
## Example 1: Curve Detectors
## Example 2: High-Low Frequency Detectors
## Example 3: Pose-Invariant Dog Head Detector
## Polysemantic Neurons


# Claim 2: Circuits
## Circuit 1: Curve Detectors
## Circuit 2: Oriented Dog Head Detection
## Circuit 3: Cars in Superposition

# Claim 3: Universality
## Interpretability as a Natural Science

# Closing Thoughts

Here's a useless table:

| Number | Next number | Previous number |
| :------ |:--- | :--- |
| Five | Six | Four |
| Ten | Eleven | Nine |
| Seven | Eight | Six |
| Two | Three | One |


How about a yummy crepe?

![Crepe](https://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg)

It can also be centered!

![Crepe](https://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg){: .mx-auto.d-block :}

Here's a code chunk:

~~~
var foo = function(x) {
  return(x + 5);
}
foo(3)
~~~

And here is the same code with syntax highlighting:

```javascript
var foo = function(x) {
  return(x + 5);
}
foo(3)
```

And here is the same code yet again but with line numbers:

{% highlight javascript linenos %}
var foo = function(x) {
  return(x + 5);
}
foo(3)
{% endhighlight %}

## Boxes
You can add notification, warning and error boxes like this:

### Notification

{: .box-note}
**Note:** This is a notification box.

### Warning

{: .box-warning}
**Warning:** This is a warning box.

### Error

{: .box-error}
**Error:** This is an error box.