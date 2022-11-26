  const page = {
    init: function (vertices) {
      const n=vertices.length/3
      const canvasObj = document.querySelector("#demo");
      const glContext = canvasObj.getContext("webgl");

      if (!glContext) {
        alert(" WebGL");
        return;
      }
      this.setBuffers(glContext, vertices);
      const vertexShader = this.createVertexShader(glContext);
      const fragmentShader = this.createFragmentShader(glContext);
      const shaderProgram = this.initShaderProgram(
        glContext,
        vertexShader,
        fragmentShader
      );
      this.draw(glContext, shaderProgram, n);
    },
    setBuffers: function (gl, vertexData) {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      const dataFormat = new Float32Array(vertexData);
      gl.bufferData(gl.ARRAY_BUFFER, dataFormat, gl.STATIC_DRAW);
    },
    createVertexShader: function (gl) {
      const source = `
        attribute vec3 vertexPos;
        void main(void){
          gl_Position = vec4(vertexPos, 1);
        }
      `;

      const shader = gl.createShader(gl.VERTEX_SHADER);

      gl.shaderSource(shader, source);

      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("alerta: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },
    createFragmentShader: function (gl) {
      const source = `
        void main(void){
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `;

      const shader = gl.createShader(gl.FRAGMENT_SHADER);

      gl.shaderSource(shader, source);

      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("alerta2: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },
    initShaderProgram: function (gl, vertexShader, fragmentShader) {
      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("alerta3: " + gl.getProgramInfoLog(shaderProgram));
        return null;
      }

      return shaderProgram;
    },
    draw: function (gl, shaderProgram, n) {
      const vertexPos = gl.getAttribLocation(shaderProgram, "vertexPos");
      gl.vertexAttribPointer(vertexPos, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vertexPos);
      gl.useProgram(shaderProgram);
      gl.drawArrays(gl.LINE_STRIP, 0, n);
    },
  };
