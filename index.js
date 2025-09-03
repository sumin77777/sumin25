
document.addEventListener("DOMContentLoaded", () => {
  const pdfThumbs = document.querySelectorAll(".pdf-thumb");

  pdfThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const pdfUrl = thumb.dataset.pdf;
      window.open(pdfUrl, "_blank"); // 새 창(탭)으로 열기
    });
  });

  const wrap = document.querySelector('.bg-text-wrap');

  // 무한 루프 애니메이션: x를 -50% 만큼 이동시키고, 다시 0으로 래핑

  // 첫 번째 줄: 왼쪽으로 이동
  gsap.to('.wrap-txt1', {
    xPercent: -50,
    ease: 'none',
    duration: 20,
    repeat: -1
  });
  // 두 번째 줄: 오른쪽으로 이동 (반대 방향)
  gsap.to('.wrap-txt2', {
    xPercent: 50,
    ease: 'none',
    duration: 25,
    repeat: -1
  });

  ScrollTrigger.batch('.panel', {
    start: 'top 80%',
    onEnter: batch => {
      gsap.fromTo(batch,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.6, ease: 'power2.out' }
      );
    },
    onLeaveBack: batch => {
      gsap.to(batch, { y: 50, opacity: 0, duration: 0.4, ease: 'power2.in' });
    }
  });

});


document.addEventListener('DOMContentLoaded', () => {
  // GSAP & ScrollTrigger 설정
  gsap.registerPlugin(ScrollTrigger);

  // 차트 애니메이션을 위한 ScrollTrigger 설정
  ScrollTrigger.create({
    trigger: "#chart-section",  // 차트를 포함한 섹션
    start: "top 80%",  // 화면 상단 80%에 닿을 때 애니메이션 시작
    onEnter: () => animateCharts(),
    once: true  // 한 번만 실행
  });

  // 차트 애니메이션 함수
  function animateCharts() {
    const charts = document.querySelectorAll('.chart');
    
    charts.forEach(chart => {
      const title = chart.querySelector('.data-num');
      const circle = chart.querySelector('circle');
      const target = +title.getAttribute('data-num');
      const radius = circle.getAttribute('r');
      const circumference = 2 * Math.PI * radius; // 원의 둘레 계산

      // strokeDasharray 값 설정
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;

      // GSAP 애니메이션 (from 0 to data-num)
      gsap.to({ value: 0 }, {
        value: target,  // 목표값
        duration: 1.5,
        ease: 'power1.out',
        onUpdate() {
          const progress = this.targets()[0].value;
          title.textContent = Math.floor(progress);
          const offset = circumference * (1 - progress / 100); // 원의 외각선을 그려나감
          circle.style.strokeDashoffset = offset;
        }
      });
    });
  }
});