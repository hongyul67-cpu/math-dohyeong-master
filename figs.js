/* ══════════════════════════════════════════════════════════════
   수학 도형의 방정식 자습 — 그림 모음 (보조08 · 2026-10-01)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html 의 배우기(주제 개념) 화면이 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', topics:['주제 id'…], draw:function(){ … } }
       topics — index.html 의 TOPICS[].id. 그 주제 개념 카드 맨 아래 「🖼️ 그림으로 보기」에 나온다
     순서 = 화면에 나오는 순서.

   수치는 개념 본문(TOPICS[].concept)에 있는 예만 썼다. 숫자가 없는 그림은 개념만 그린 것.
   문제 생성기의 좌표 그림(planeOf)은 문제와 같은 함수라 손대지 않았다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, poly = F.poly;

  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + (c || C.ink) + '"/>'; }
  function ring(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 5) + '" fill="#fff" stroke="' + (c || C.ink) + '" stroke-width="2.2"/>'; }
  function circ(cx, cy, r, c, o) {
    o = o || {};
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (o.fill || 'none') + '" stroke="' + (c || C.blue) + '" stroke-width="' + (o.w || 2.4) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + '/>';
  }
  function rect(x, y, w, h, fill, c, sw) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '" stroke="' + (c || C.ink) + '" stroke-width="' + (sw || 1.6) + '"/>';
  }
  /* 좌표평면: 원점 픽셀(ox,oy), 한 칸 u, 범위 x:a~b · y:c~d */
  function plane(ox, oy, u, a, b, c, d, o) {
    o = o || {};
    var X = function (v) { return ox + v * u; }, Y = function (v) { return oy - v * u; };
    var s = '';
    if (o.grid !== false) {
      for (var v = Math.ceil(a); v <= b; v++) if (v) s += line(X(v), Y(c), X(v), Y(d), { c: C.edge, w: 1 });
      for (var w = Math.ceil(c); w <= d; w++) if (w) s += line(X(a), Y(w), X(b), Y(w), { c: C.edge, w: 1 });
    }
    s += arrow(X(a) - 4, oy, X(b) + 14, oy, { w: 1.5, head: 8 }) + arrow(ox, Y(c) + 4, ox, Y(d) - 14, { w: 1.5, head: 8 });
    s += t(X(b) + 12, oy + 14, 'x', { a: 'm', size: 14, c: C.sub }) + t(ox - 12, Y(d) - 10, 'y', { a: 'm', size: 14, c: C.sub }) +
      t(ox - 10, oy + 13, 'O', { a: 'm', size: 13, c: C.sub });
    (o.xt || []).forEach(function (v) { s += line(X(v), oy - 4, X(v), oy + 4, { w: 1.2 }) + t(X(v), oy + 16, String(v).replace('-', '−'), { a: 'm', size: 13, c: C.sub }); });
    (o.yt || []).forEach(function (v) { s += line(ox - 4, Y(v), ox + 4, Y(v), { w: 1.2 }) + t(ox - 8, Y(v), String(v).replace('-', '−'), { a: 'e', size: 13, c: C.sub }); });
    return { s: s, X: X, Y: Y };
  }
  function curve(P, fn, x0, x1, o) {
    var pts = [];
    for (var i = 0; i <= 60; i++) { var x = x0 + (x1 - x0) * i / 60; pts.push([P.X(x), P.Y(fn(x))]); }
    return poly(pts, o);
  }
  function rightMark(x, y, ang, s) { /* (x,y) 에서 ang 방향과 그 수직 방향으로 작은 직각 표시 */
    var c = Math.cos(ang), n = Math.sin(ang), k = s || 10;
    return poly([[x + c * k, y + n * k], [x + c * k - n * k, y + n * k + c * k], [x - n * k, y + c * k]], { c: C.ink, w: 1.2 });
  }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }

  return {

  /* ── 5. 직선의 방정식 ── */
  slopestep: { topics: ['line'],
    cap: '기울기 = 세로로 간 칸 ÷ 가로로 간 칸 — y = 2x + 1 은 오른쪽 1칸에 위로 2칸',
    draw: function () {
      var P = plane(80, 214, 30, -1.5, 4, -1, 6, { xt: [1, 2], yt: [1, 3, 5] });
      var s = P.s + line(P.X(-1), P.Y(-1), P.X(2.6), P.Y(6.2), { c: C.blue, w: 2.6 });
      [[0, 1], [1, 3]].forEach(function (p) {
        s += line(P.X(p[0]), P.Y(p[1]), P.X(p[0] + 1), P.Y(p[1]), { c: C.orange, w: 2.6 }) +
          line(P.X(p[0] + 1), P.Y(p[1]), P.X(p[0] + 1), P.Y(p[1] + 2), { c: C.red, w: 2.6 });
      });
      s += dot(P.X(0), P.Y(1), 6, C.blue);
      s += t(P.X(0.5), P.Y(1) + 15, 'Δx = 1', { a: 'm', size: 13, b: 1, c: C.orange }) + t(P.X(1) + 8, P.Y(2), 'Δy = 2', { a: 's', size: 13, b: 1, c: C.red });
      s += t(P.X(0) - 8, P.Y(1) - 14, 'y절편 1', { a: 'e', size: 13, b: 1, c: C.blue });
      s += t(350, 50, 'y = 2x + 1', { a: 'm', b: 1, size: 19, c: C.blue });
      s += t(350, 88, '기울기 = Δy ÷ Δx = 2 ÷ 1 = 2', { a: 'm', size: 14 });
      s += line(262, 112, 450, 112, { c: C.edge, w: 1 });
      /* 음수 기울기 */
      s += arrow(290, 214, 420, 214, { w: 1.2, head: 7 }) + arrow(300, 222, 300, 128, { w: 1.2, head: 7 });
      s += line(310, 140, 412, 206, { c: C.purple, w: 2.4 });
      s += t(380, 150, '기울기 < 0', { a: 's', size: 14, b: 1, c: C.purple }) + t(380, 172, '→ 내려간다', { a: 's', size: 13, c: C.sub });
      return F.svg(480, 246, s);
    } },

  /* ── 7. 점과 직선 사이의 거리 ── */
  pdfoot: { topics: ['pd'],
    cap: '점과 직선 사이의 거리 = 점에서 직선에 내린 수선의 길이 — P(2, −3) 과 3x − 4y + 2 = 0 사이 d = 4',
    draw: function () {
      var P = plane(170, 120, 26, -4.6, 4.4, -3.8, 3.4, { xt: [2], yt: [-3] });
      var fn = function (x) { return (3 * x + 2) / 4; };
      var s = P.s + line(P.X(-4.6), P.Y(fn(-4.6)), P.X(4.4), P.Y(fn(4.4)), { c: C.sub, w: 2.4 });
      var px = 2, py = -3, hx = -0.4, hy = 0.2;
      s += line(P.X(px), P.Y(py), P.X(hx), P.Y(hy), { c: C.red, w: 3 });
      var ang = Math.atan2(P.Y(py) - P.Y(hy), P.X(px) - P.X(hx)), la = Math.atan2(P.Y(fn(4)) - P.Y(fn(-4)), P.X(4) - P.X(-4));
      s += poly([[P.X(hx) + 11 * Math.cos(ang), P.Y(hy) + 11 * Math.sin(ang)],
        [P.X(hx) + 11 * Math.cos(ang) + 11 * Math.cos(la), P.Y(hy) + 11 * Math.sin(ang) + 11 * Math.sin(la)],
        [P.X(hx) + 11 * Math.cos(la), P.Y(hy) + 11 * Math.sin(la)]], { c: C.ink, w: 1.2 });
      s += dot(P.X(px), P.Y(py), 6, C.blue) + t(P.X(px) + 10, P.Y(py) + 4, 'P(2, −3)', { a: 's', b: 1, c: C.blue });
      s += dot(P.X(hx), P.Y(hy), 5, C.red) + t(P.X(hx) - 12, P.Y(hy) - 16, '수선의 발', { a: 'e', size: 13, c: C.red, b: 1 });
      s += t((P.X(px) + P.X(hx)) / 2 - 12, (P.Y(py) + P.Y(hy)) / 2 + 2, 'd', { a: 'e', size: 18, b: 1, c: C.red });
      s += t(300, 24, '직선 3x − 4y + 2 = 0', { size: 13, c: C.sub, b: 1 });
      s += t(240, 246, 'd = |3·2 − 4·(−3) + 2| ÷ √(3² + 4²) = 20 ÷ 5 = 4', { a: 'm', size: 14, b: 1, c: C.red });
      return F.svg(480, 266, s);
    } },

  /* ── 8. 원의 방정식 (표준형) ── */
  cirradius: { topics: ['cir'],
    cap: '반지름 구하는 네 가지 조건 — 원점을 지남 · x축에 접함 · y축에 접함 · 두 점이 지름의 양 끝',
    draw: function () {
      var s = '', cells = [[0, 0], [240, 0], [0, 150], [240, 150]];
      cells.forEach(function (c, i) {
        var ox = c[0] + 40, oy = c[1] + 118, cx = ox + 92, cy = oy - 48;
        s += arrow(c[0] + 18, oy, c[0] + 222, oy, { w: 1.2, head: 7 }) + arrow(ox, c[1] + 140, ox, c[1] + 12, { w: 1.2, head: 7 });
        var r, lab;
        if (i === 0) { cx = ox + 54; cy = oy - 32; r = Math.sqrt(54 * 54 + 32 * 32); s += line(cx, cy, ox, oy, { c: C.red, w: 2.2 }); lab = '① 원점을 지남'; }
        if (i === 1) { cx = ox + 100; cy = oy - 44; r = 44; s += line(cx, cy, cx, oy, { c: C.red, w: 2.2 }); s += t(cx + 8, oy - 22, '|y좌표|', { a: 's', size: 13, b: 1, c: C.red }); lab = '② x축에 접함'; }
        if (i === 2) { cx = ox + 44; cy = oy - 50; r = 44; s += line(cx, cy, ox, cy, { c: C.red, w: 2.2 }); s += t(cx + 50, cy + 2, '|x좌표|', { a: 's', size: 13, b: 1, c: C.red }); lab = '③ y축에 접함'; }
        if (i === 3) { cx = ox + 90; cy = oy - 50; r = 42; var ax = cx - 34, ay = cy + 25, bx = cx + 34, by = cy - 25;
          s += line(ax, ay, bx, by, { c: C.red, w: 2.2 }) + dot(ax, ay, 5, C.ink) + dot(bx, by, 5, C.ink) + t(cx + 10, cy + 16, '중점', { a: 's', size: 13, b: 1, c: C.red }); lab = '④ 지름의 양 끝'; }
        s += circ(cx, cy, r, C.blue) + dot(cx, cy, 4, C.blue);
        s += t(c[0] + 16, c[1] + 18, lab, { size: 14, b: 1 });
      });
      s += divider(240, 10, 290) + line(10, 150, 470, 150, { c: C.grayM, w: 1.4, dash: '6 5' });
      return F.svg(480, 300, s);
    } },

  /* ── 9. 일반형 → 중심·반지름 ── */
  gentile: { topics: ['gen'],
    cap: '완전제곱식 만들기 — y² + 6y 에 (6 의 절반)² = 9 를 더하면 정사각형 (y + 3)²',
    draw: function () {
      var X = 96, u = 26, x0 = 40, y0 = 40, s = '';
      s += rect(x0, y0, X, X, C.blueL) + t(x0 + X / 2, y0 + X / 2, 'y²', { a: 'm', b: 1, c: C.blue });
      s += rect(x0 + X, y0, 3 * u, X, C.greenL) + t(x0 + X + 1.5 * u, y0 + X / 2, '3y', { a: 'm', b: 1, c: C.green });
      s += rect(x0, y0 + X, X, 3 * u, C.greenL) + t(x0 + X / 2, y0 + X + 1.5 * u, '3y', { a: 'm', b: 1, c: C.green });
      s += rect(x0 + X, y0 + X, 3 * u, 3 * u, C.orangeL, C.orange, 2.4) + t(x0 + X + 1.5 * u, y0 + X + 1.5 * u, '9', { a: 'm', b: 1, c: C.orange, size: 18 });
      s += t(x0 + X / 2, y0 - 14, 'y', { a: 'm', b: 1 }) + t(x0 + X + 1.5 * u, y0 - 14, '3', { a: 'm', b: 1 });
      s += t(x0 - 14, y0 + X / 2, 'y', { a: 'm', b: 1 }) + t(x0 - 14, y0 + X + 1.5 * u, '3', { a: 'm', b: 1 });
      s += t(340, 56, 'y² + 6y', { a: 'm', b: 1, size: 19 });
      s += t(340, 86, '6y 를 반씩 → 3y 두 개', { a: 'm', size: 13, c: C.sub });
      s += t(340, 120, '빈 모서리 3 × 3 = 9', { a: 'm', size: 15, b: 1, c: C.orange });
      s += t(340, 160, 'y² + 6y + 9 = (y + 3)²', { a: 'm', b: 1, size: 17, c: C.blue });
      s += F.box(232, 186, 216, 40, { fill: C.yellowL, c: C.orange, w: 1.2, label: '더한 9 는 우변에도 더한다', size: 14 });
      return F.svg(480, 236, s);
    } },

  /* ── 10. 원이 될 조건 · 최댓값 ── */
  rsign: { topics: ['kmax'],
    cap: '우변(r²)의 부호 — 0 보다 크면 원, 0 이면 점 하나, 0 보다 작으면 그런 도형은 없다',
    draw: function () {
      var s = '';
      [[80, 'x² + y² = 25', '우변 > 0', '원', C.blue, 2], [240, 'x² + y² = 0', '우변 = 0', '점 하나', C.green, 1], [400, 'x² + y² = −25', '우변 < 0', '없음', C.red, 0]].forEach(function (p) {
        var cx = p[0], cy = 112;
        s += line(cx - 66, cy, cx + 66, cy, { c: C.grayM, w: 1.2 }) + line(cx, cy - 66, cx, cy + 66, { c: C.grayM, w: 1.2 });
        if (p[5] === 2) s += circ(cx, cy, 50, p[4]);
        if (p[5] === 1) s += dot(cx, cy, 7, p[4]);
        if (p[5] === 0) s += t(cx + 30, cy - 34, '✕', { a: 'm', size: 26, b: 1, c: p[4] });
        s += t(cx, 200, p[2], { a: 'm', b: 1, size: 16, c: p[4] }) + t(cx, 224, p[3], { a: 'm', size: 15, b: 1 }) + t(cx, 248, p[1], { a: 'm', size: 13, c: C.sub });
      });
      return F.svg(480, 266, s);
    } },

  rmax: { topics: ['kmax'],
    cap: 'r² = −(a + 2)² + 3 — 앞에 − 가 붙은 포물선은 a = −2 일 때 가장 높다(최댓값 3)',
    draw: function () {
      var P = plane(240, 210, 30, -5.5, 1.5, -1, 4.6, { xt: [-2], yt: [3] });
      var s = P.s + curve(P, function (a) { return -(a + 2) * (a + 2) + 3; }, -4, 0, { c: C.blue, w: 2.6 });
      s += line(P.X(-2), P.Y(3), P.X(-2), P.Y(0), { c: C.sub, w: 1, dash: '4 3' }) + line(P.X(-2), P.Y(3), P.X(0), P.Y(3), { c: C.sub, w: 1, dash: '4 3' });
      s += dot(P.X(-2), P.Y(3), 7, C.red) + t(P.X(-2), P.Y(3) - 18, '꼭대기 = 최댓값 3', { a: 'm', b: 1, size: 14, c: C.red });
      s += t(16, 30, '가로축 a · 세로축 r²', { size: 13, c: C.sub });
      s += t(380, 92, '괄호 = 0', { a: 'm', size: 15, b: 1 }) + t(380, 116, '→ a = −2', { a: 'm', size: 15 });
      s += t(380, 156, '넓이 πr² 도', { a: 'm', size: 14, c: C.sub }) + t(380, 178, '이때 가장 크다', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 250, s);
    } },

  /* ── 11. 부등식 3종 세트 ── */
  ineqparab: { topics: ['ineq'],
    cap: '이차부등식을 포물선으로 보면 — x축 위(> 0)는 두 근의 바깥, x축 아래(< 0)는 사이',
    draw: function () {
      var s = '';
      function panel(ox, p, q, sign, title) {
        var mid = (p + q) / 2, half = (q - p) / 2, u = 72 / (half * 1.35), k = 50 / (half * half), oy = 110;
        var X = function (v) { return ox + (v - mid) * u; }, Y = function (v) { return oy - v * k; }, pts = [];
        for (var i = 0; i <= 40; i++) { var x = mid - half * 1.35 + half * 2.7 * i / 40; pts.push([X(x), Y((x - p) * (x - q))]); }
        var r = '';
        r += arrow(X(mid) - 98, oy, X(mid) + 102, oy, { w: 1.4, head: 8 }) + poly(pts, { c: C.ink, w: 2.2 });
        if (sign > 0) r += line(X(mid) - 96, oy, X(p), oy, { c: C.green, w: 5 }) + line(X(q), oy, X(mid) + 92, oy, { c: C.green, w: 5 });
        else r += line(X(p), oy, X(q), oy, { c: C.red, w: 5 });
        r += ring(X(p), oy, 5, sign > 0 ? C.green : C.red) + ring(X(q), oy, 5, sign > 0 ? C.green : C.red);
        r += t(X(p), oy + 18, String(p).replace('-', '−'), { a: 'm', size: 13, c: C.sub }) + t(X(q), oy + 18, String(q), { a: 'm', size: 13, c: C.sub });
        r += t(X(mid), 30, title, { a: 'm', b: 1, size: 15 });
        return r;
      }
      s += panel(120, 1, 3, 1, '(x − 1)(x − 3) > 0');
      s += panel(360, -2, 5, -1, '(x + 2)(x − 5) < 0');
      s += divider(240, 16, 230);
      s += t(120, 196, '크다 → 바깥', { a: 'm', b: 1, size: 15, c: C.green }) + t(120, 220, 'x < 1 또는 3 < x', { a: 'm', size: 14 });
      s += t(360, 196, '작다 → 사이', { a: 'm', b: 1, size: 15, c: C.red }) + t(360, 220, '−2 < x < 5', { a: 'm', size: 14 });
      return F.svg(480, 240, s);
    } },

  ineqabs: { topics: ['ineq'],
    cap: '절댓값 = 거리 — |x − 1| < 3 은 「1 에서 거리가 3 보다 작다」, 그래서 −2 < x < 4 (사이)',
    draw: function () {
      var s = '', y = 120, x0 = 40, u = 40, X = function (v) { return x0 + (v + 3) * u; };
      s += arrow(X(-3) - 10, y, X(6) + 20, y, { w: 1.6, head: 9 });
      for (var v = -3; v <= 6; v++) s += line(X(v), y - 5, X(v), y + 5, { w: 1.2 }) + t(X(v), y + 20, String(v).replace('-', '−'), { a: 'm', size: 13, c: v === 1 ? C.ink : C.sub, b: v === 1 });
      s += line(X(-2), y, X(4), y, { c: C.red, w: 5 }) + ring(X(-2), y, 6, C.red) + ring(X(4), y, 6, C.red) + dot(X(1), y, 5);
      s += F.dim(X(1), y, X(4), y, '3', { off: 30, c: C.blue }) + F.dim(X(-2), y, X(1), y, '3', { off: 30, c: C.blue });
      s += t(240, 30, '|x − 1| < 3', { a: 'm', b: 1, size: 19 });
      s += t(240, 178, '−3 < x − 1 < 3  →  −2 < x < 4', { a: 'm', size: 16, b: 1, c: C.red });
      s += t(240, 210, '< 이면 사이(한 덩어리) · > 이면 바깥(두 조각)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 230, s);
    } },

  /* ── 13. 원과 직선 — 거리로 ── */
  cdist3: { topics: ['cdist'],
    cap: '중심에서 직선까지의 거리 d 와 반지름 r — d < r 두 점, d = r 접함, d > r 만나지 않음',
    draw: function () {
      var s = '', r = 46;
      [[80, 26, 'd < r', '두 점', C.green], [240, 46, 'd = r', '한 점 (접함)', C.orange], [400, 66, 'd > r', '만나지 않음', C.red]].forEach(function (p) {
        var cx = p[0], cy = 100, ly = cy + p[1];
        s += circ(cx, cy, r, C.blue) + dot(cx, cy, 4, C.blue);
        s += line(cx - 74, ly, cx + 74, ly, { c: p[4], w: 2.4 });
        s += line(cx, cy, cx, ly, { c: C.ink, w: 1.4, dash: '4 3' }) + t(cx + 6, (cy + ly) / 2 + 2, 'd', { a: 's', size: 15, b: 1 });
        s += line(cx, cy, cx - r * 0.8, cy - r * 0.6, { c: C.sub, w: 1.4 }) + t(cx - 26, cy - 30, 'r', { a: 'm', size: 14, b: 1, c: C.sub });
        if (p[1] < r) { var hx = Math.sqrt(r * r - p[1] * p[1]); s += dot(cx - hx, ly, 5, p[4]) + dot(cx + hx, ly, 5, p[4]); }
        if (p[1] === r) s += dot(cx, ly, 5, p[4]);
        s += t(cx, 200, p[2], { a: 'm', b: 1, size: 17, c: p[4] }) + t(cx, 224, p[3], { a: 'm', size: 14 });
      });
      return F.svg(480, 244, s);
    } },

  /* ── 14. 평행이동 ── */
  transshape: { topics: ['trans'],
    cap: 'x축 방향 3, y축 방향 2 만큼 평행이동 — 원은 중심만 옮겨지고(반지름 그대로), 직선은 기울기가 그대로',
    draw: function () {
      var s = '';
      var P = plane(30, 200, 30, -0.5, 6, -0.5, 5.6, { xt: [1, 4], yt: [1, 3] });
      s += P.s + circ(P.X(1), P.Y(1), 30, C.sub, { dash: '6 5', w: 2 }) + circ(P.X(4), P.Y(3), 30, C.blue);
      s += dot(P.X(1), P.Y(1), 5, C.sub) + dot(P.X(4), P.Y(3), 5, C.blue);
      s += arrow(P.X(1) + 6, P.Y(1) - 4, P.X(4) - 7, P.Y(3) + 5, { c: C.red, w: 2 });
      s += t(P.X(4) + 12, P.Y(3) - 36, '반지름 그대로', { a: 'm', size: 13, b: 1, c: C.blue });
      s += t(110, 24, '원', { a: 'm', b: 1, size: 16 });
      s += divider(240, 14, 236);
      var Q = plane(270, 200, 30, -0.5, 6, -0.5, 5.6, {});
      s += Q.s + line(Q.X(-0.4), Q.Y(-0.4), Q.X(5.4), Q.Y(5.4), { c: C.sub, w: 2, dash: '6 5' }) + line(Q.X(0.6), Q.Y(-0.4), Q.X(6), Q.Y(5), { c: C.blue, w: 2.4 });
      s += dot(Q.X(1), Q.Y(1), 5, C.sub) + dot(Q.X(4), Q.Y(3), 5, C.blue) + arrow(Q.X(1) + 6, Q.Y(1) - 4, Q.X(4) - 7, Q.Y(3) + 5, { c: C.red, w: 2 });
      s += t(Q.X(1.6), Q.Y(4.6), 'y = x', { a: 'e', size: 13, c: C.sub, b: 1 }) + t(Q.X(5.2), Q.Y(2.6), 'y = x − 1', { a: 'm', size: 13, c: C.blue, b: 1 });
      s += t(360, 24, '직선 — 기울기 그대로', { a: 'm', b: 1, size: 15 });
      return F.svg(480, 246, s);
    } }

  };
})();
