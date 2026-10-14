let runtimePromise;

self.onmessage = async ({ data }) => {
  try {
    if (!self.loadPyodide) {
      self.importScripts(
        "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js",
      );
    }
    runtimePromise ??= self.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
    });
    const pyodide = await runtimePromise;
    self.postMessage({ status: "ready" });
    const output = [];
    let outputLength = 0;
    let outputTruncated = false;
    const appendOutput = (text) => {
      const chunk = `${text}\n`;
      const remaining = 50_000 - outputLength;
      if (remaining <= 0) {
        outputTruncated = true;
        return;
      }
      output.push(chunk.slice(0, remaining));
      outputLength += Math.min(chunk.length, remaining);
      outputTruncated ||= chunk.length > remaining;
    };
    pyodide.setStdout({ batched: appendOutput });
    pyodide.setStderr({ batched: appendOutput });
    const inputValues = pyodide.toPy(data.inputs);
    pyodide.globals.set("__pyquest_inputs", inputValues);
    try {
      await pyodide.runPythonAsync(`
def input(prompt=""):
    if prompt:
        print(prompt, end="")
    if not __pyquest_inputs:
        raise EOFError("Add another answer in the program input box.")
    return __pyquest_inputs.pop(0)
`);
      await pyodide.runPythonAsync(data.code);
      self.postMessage({
        ok: true,
        output:
          `${output.join("")}${outputTruncated ? "\n(Output shortened.)" : ""}` ||
          "Program finished with no output.",
      });
    } finally {
      pyodide.globals.delete("__pyquest_inputs");
      inputValues.destroy();
    }
  } catch (error) {
    self.postMessage({ ok: false, error: String(error) });
  }
};
