import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

@Component({
  selector: 'app-hearts',
  imports: [],
  templateUrl: './hearts.component.html',
  standalone: true,
  styleUrl: './hearts.component.scss'
})
export class HeartsComponent implements AfterViewInit {
  @ViewChild('heartsCanvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.initHeartsEffect();
  }


  private initHeartsEffect() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = 800;

    const hearts: Heart[] = [];

    function drawText() {
      ctx.font = '50px Arial';
      ctx.fillStyle = 'rgba(255, 0, 100, 0.8)';
      ctx.shadowColor = 'rgba(255, 0, 100, 0.6)';
      ctx.shadowBlur = 15;
      ctx.textAlign = 'center';
      ctx.fillText('Dima', canvas.width / 2, canvas.height / 2);
      ctx.shadowBlur = 0; // Reset shadow blur
    }

    function drawHeart(heart: Heart) {
      const { x, y, size, speed, opacity } = heart;

      ctx.fillStyle = `rgb(255, 0, 100, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
      ctx.bezierCurveTo(x + size, y + size / 3,  x + size / 2, y - size / 2, x, y);
      ctx.fill();
    }

    function updateHearts() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawText();

      hearts.forEach((heart, index) => {
        heart.y -= heart.speed;
        heart.opacity -= 0.0005;

        drawHeart(heart);

        if (heart.opacity <= 0) {
          hearts.splice(index, 1);
        }
      });

      requestAnimationFrame(updateHearts);
    }

    function createHeart() {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const size = Math.random() * 20 + 10;
      const speed = Math.random() * 2 * 1;
      const opacity = 1;

      hearts.push({x, y, size, speed, opacity});

      setTimeout(createHeart, 300);
    }

    createHeart();
    updateHearts();
  }

}
