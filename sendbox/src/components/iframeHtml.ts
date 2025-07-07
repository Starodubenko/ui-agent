export const IFRAME_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Sandbox</title>
  <style>
    body { margin: 0; padding: 1rem; font-family: sans-serif; }
    #root { margin-top: 1rem; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="module">
    function postStatus(status, error) {
      window.parent.postMessage({ __sandbox_status: true, status, error }, "*");
    }

    window.addEventListener("message", async (event) => {
      if (!event.data?.transpiled) return;

      try {
        const blob = new Blob([event.data.transpiled], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        await import(url); // 🟢 Точка выполнения пользовательского кода
        postStatus("done");
      } catch (err) {
        postStatus("error", err.message || String(err));
        document.getElementById("root").innerHTML = "<pre style='color:red'>" + err + "</pre>";
      }
    }, false);

    postStatus("idle");
  </script>
</body>
</html>

`;
