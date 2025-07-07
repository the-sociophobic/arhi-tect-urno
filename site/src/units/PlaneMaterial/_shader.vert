#define GLSLIFY 1
//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// Classic Perlin noise
float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

#define PI 3.14159265358979323846264338327

varying vec2 vUv;

uniform vec2 uOffsetNoise;
uniform float uDirection;
uniform float uIntensity;
uniform float uLimitCurve;
uniform float uLimitShear;
uniform float uHoverProgress;

float normalized(float value) {
  return (value + 1.0) * 0.5;
}

void main() {
  vUv = uv;

  vec3 displaced = position;
// float normalizedX = 1.0 - (position.x + 0.5);
  float normalizedY = 0.5 + position.y;
  float offsetCurve = uLimitCurve * uIntensity;
  float offsetShear = uLimitShear * uIntensity;

  float offset = sin(normalizedY * PI) * offsetCurve;

  displaced.x -= uDirection * offset; // Curve
  displaced.x -= (normalizedY * -offsetShear) * uDirection; // shear

  float n = normalized(cnoise((vUv * 2.) + uOffsetNoise)) * 0.5 + 0.5; // from 0.5 to 1.0

// circle
  float rX = abs(vUv.x * 2. - 1.0) * -1.;
// float rY = abs(vUv.y * 2. - 1.0) * -1.;
  displaced.z += cos(rX) * 0.04;

  float p = uHoverProgress;

// wave
  float gradientSize = 0.3;
  float skewSize = 0.2;
  float progress = p + (p * 2. * gradientSize) + (p * 2. * skewSize) - gradientSize - skewSize;
  float start = progress - gradientSize;
  float end = progress + gradientSize;
  float y = smoothstep(start, end, vUv.x + ((1.0 - vUv.y) * skewSize));
  float height = 1.0 - abs(y * 2. - 1.);
  displaced.z += (height * n) * 0.03;
// end wave

  vec4 modelViewPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
