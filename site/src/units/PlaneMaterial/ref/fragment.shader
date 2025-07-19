"#define GLSLIFY 1
#define DEPTH_MULT 20.0
uniform vec3 uColor;
uniform float uOpacity;

uniform vec2 uTime;

varying float v_depth;

void main(void) {
    gl_FragColor = vec4(uColor, (sin(uTime.x + DEPTH_MULT * v_depth) * uOpacity) * 0.5);
}
";