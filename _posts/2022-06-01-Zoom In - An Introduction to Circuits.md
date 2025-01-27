---
layout: post
title: Zoom In - An Introduction to Circuits
subtitle: mechanistic-interpretability - 딥러닝 모델의 작동 원리에 대한 이해
# cover-img: /assets/img/path.jpg
# thumbnail-img: /assets/img/thumb.png
# share-img: /assets/img/path.jpg
tags: [mechanistic-interpretability]
comments: true
---

WIP

Article Link : [distill article](https://distill.pub/2020/circuits/zoom-in/)

{: .box-note}
생물학의 세포를 보듯, DNN 의 뉴런을 분석하자.

이번 논문은 distill 그룹의 Circuit thread 의 첫 번째 Article 이다. 

이들은 

딥러닝 모델의 내부 메커니즘을 해석하고 싶다는 막연한 생각을 실제적인 연구 질문 3가지로 구체화해준 고마운 논문. 

이들이 제시한 3가지 질문에 대해서 정보이론, 정보기하학, 인과추론의 관점에서 답하는 것이 개인적인 관심사다.

# Abstract

Does it make sense to treat individual neurons and the connections between them as a serious object of study? This essay proposes three claims which, if true, might justify serious inquiry into them: the existence of meaningful features, the existence of meaningful circuits between features, and the universality of those features and circuits.

It also discuses historical successes of science “zooming in,” whether we should be concerned about this research being qualitative, and approaches to rigorous investigation.


# Introduction : Three Speculative Claims

Circuit thread 

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