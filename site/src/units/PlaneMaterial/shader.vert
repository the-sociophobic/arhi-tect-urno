#define GLSLIFY 1
varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uOpacity;
uniform float uOpacityHover;
uniform float uHoverProgress;
uniform vec3 uColor;
uniform float uColorBlend;

vec3 blendNormal(vec3 base, vec3 blend) {
  return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
  return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

void main() {
  vec4 texture = texture2D(uTexture, vUv);
  vec3 grayscaleTexture = mix(vec3(dot(texture.rgb, vec3(0.299, 0.587, 0.114))) * 0.95, uColor, 0.35);

  float p = uHoverProgress;

    // wave
  float gradientSize = 0.1;
  float skewSize = 0.2;
  float progress = uHoverProgress + (uHoverProgress * 2. * gradientSize) + (uHoverProgress * 2. * skewSize) - gradientSize - skewSize;
  float start = progress - gradientSize;
  float end = progress + gradientSize;
  float y = smoothstep(start, end, vUv.x + ((1.0 - vUv.y) * skewSize));
    // end wave

  vec3 gradedTexture = mix(texture.rgb, grayscaleTexture, 0.1);
  gradedTexture.r -= 0.01;

  vec3 color = mix(gradedTexture, grayscaleTexture, y);
  gl_FragColor = vec4(color, uOpacity);
}
