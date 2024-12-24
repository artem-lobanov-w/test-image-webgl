uniform vec2 res;
uniform sampler2D tex;
uniform sampler2D tex2;
uniform vec3 mouse;
uniform vec2 mouseReal;
uniform vec2 pos;
uniform vec2 imageSize;
uniform vec2 variable;
uniform sampler2D videoTexture;

float rand(float a) {
    return fract(sin(a)*10000000.0);
}

vec3 wave(vec2 uv, float v) {
    uv.x += variable.x;
    float random = rand(uv.x*uv.y*1.05);
    uv.x = cos(uv.x);
    uv *= sin(uv);
    float s = smoothstep(-0.9, 1.0, sin(uv.x+uv.y)+uv.x);
    return  vec3(s*cos(v+uv.y)*uv.x);
}

void main() {
    vec2 posit = pos.xy / res.x;
    vec2 uv = gl_FragCoord.xy / res.x*15.0;
    
    vec3 color;
    float radius = 2.8;
    vec2 mouse = mouse.xy / res.x*15.0;

    vec3 color1 = wave(uv,variable.x);

    float dist = distance(uv.xy, mouse.xy);
    float distFactor = smoothstep(-3.0, radius, dist);
    vec3 color2 = vec3(distFactor);

    color = color1/color2+distFactor+1.2;
    color *= vec3(1.0-distFactor)/distFactor*2.0;

    posit = pos.xy / res.y*2.0;
    uv = gl_FragCoord.xy / res.y*2.0;
    float dF = smoothstep(1.0, radius, dist);
    // uv = mod(uv-posit,1.0);
    uv = uv-posit;
    uv.x /= 2.4;
    uv /= 3.0; 
    if(color.r>0.99){
        color = texture2D(tex2, uv).rgb;
    } else {
        color = texture2D(tex, uv).rgb;
    }
    gl_FragColor = vec4(color,1.0);
}