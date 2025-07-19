"#define GLSLIFY 1
uniform vec2 uTime;
uniform vec2 uRange;
uniform float uSize;

varying float v_depth;

float getRange() {
    // lower part of the range vector holds our minimum range
    float minRange = uRange.x;
    // calculate our movement ramge large - small = positive number
    float rangeDelta = uRange.y - uRange.x;
    // to keep the cos curve positive and squished to one we transform the function
    // this gives us a factor 0...1
    // we use position.x * position.y to get a unique offset which we translate by the time on the x axis
    float factor = 0.5 + cos(position.x * position.y + uTime.x) * 0.5;
    return minRange + (rangeDelta * factor);
}

void main() {
    // since we cant modify a attribute we save a copy
    vec3 pos = position;

    // sin first part of the circle * range to limit or expand size
    pos.x = sin(uTime.x + position.x) * getRange();
    // use the fractional part of ytime + position.y
    pos.y = fract(uTime.y + (position.y));
    // cos second part of the circle * range to limit or expand size
    pos.z = cos(uTime.x + position.x) * getRange();

    v_depth = pos.z;

    // since we use gl.POINTS we have to set the pointsize
    gl_PointSize = uSize;
    // calculate world position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
}
"