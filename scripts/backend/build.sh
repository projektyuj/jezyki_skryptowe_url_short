#!/usr/bin/env bash
set -euo pipefail

# Build stage for backend: install deps and byte-compile sources
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
BACKEND_DIR=$(cd "$SCRIPT_DIR/../../backend" && pwd)
PROJECT_ROOT=$(cd "$BACKEND_DIR/.." && pwd)
cd "$PROJECT_ROOT"

if ! command -v pip >/dev/null 2>&1; then
  echo "pip not found. Please ensure Python is installed." >&2
  exit 1
fi

python --version || true
pip install --upgrade pip >/dev/null
pip install -r "$BACKEND_DIR/requirements.txt"

# Byte-compile all backend Python files to catch syntax errors early
python - <<'PY'
import compileall, sys
ok = compileall.compile_dir('backend', force=True, quiet=1)
print(f"Byte-compile result: {'ok' if ok else 'failed'}")
sys.exit(0 if ok else 1)
PY

echo "Backend build stage complete"