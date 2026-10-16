
// Defines the initial chessboard layout using Unicode chess symbols.
// The array represents all 64 squares, ordered from top to bottom.
const pieces = [
  // Black major pieces on the first rank.
  "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",

  // Eight black pawns on the second rank.
  ...Array(8).fill("♟"),

  // Four empty ranks in the middle of the board.
  ...Array(32).fill(""),

  // Eight white pawns on the seventh rank.
  ...Array(8).fill("♙"),

  // White major pieces on the final rank.
  "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖",
];

// Renders a static chessboard preview for the portfolio project showcase.
function ChessPreview() {
  return (
    <div className="chess-preview">
      {/* Window-style header with decorative dots and project title */}
      <div className="preview-header">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>
        <span>ChessGame</span>
      </div>

      {/* Generates the 8x8 chessboard from the pieces array */}
      <div className="preview-board">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={
              // Alternates square colors based on row and column positions.
              (Math.floor(index / 8) + index % 8) % 2 === 0
                ? "square light"
                : "square dark"
            }
          >
            {piece}
          </div>
        ))}
      </div>

      {/* Displays the main technologies used in the project */}
      <div className="preview-footer">
        React · TypeScript · .NET
      </div>
    </div>
  );
}

export default ChessPreview;

