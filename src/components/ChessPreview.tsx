
const pieces = [
  "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
  ...Array(8).fill("♟"),
  ...Array(32).fill(""),
  ...Array(8).fill("♙"),
  "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖",
];

function ChessPreview() {
  return (
    <div className="chess-preview">
      <div className="preview-header">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>
        <span>ChessGame</span>
      </div>

      <div className="preview-board">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={
              (Math.floor(index / 8) + index % 8) % 2 === 0
                ? "square light"
                : "square dark"
            }
          >
            {piece}
          </div>
        ))}
      </div>

      <div className="preview-footer">
        React · TypeScript · .NET
      </div>
    </div>
  );
}

export default ChessPreview;
