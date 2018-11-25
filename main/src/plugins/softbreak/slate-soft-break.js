function SoftBreak() {
  var options =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    onKeyDown: function onKeyDown(event, change) {
      if (event.key !== "Enter") return;
      if (options.shift && event.shiftKey === false) return;
      return change.insertText("\n");
    }
  };
}

export default SoftBreak;
//# sourceMappingURL=slate-soft-break.es.js.map
