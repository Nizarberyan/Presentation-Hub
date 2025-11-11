#!/bin/bash

echo "🧹 Cleaning up old SvelteKit files..."
echo ""
echo "This will remove:"
echo "  - src/ directory (SvelteKit routes and lib)"
echo "  - SvelteKit configuration files"
echo "  - SMUI theme files"
echo "  - Old config files (replaced by client/ configs)"
echo ""
read -p "Are you sure you want to continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cleanup cancelled."
    exit 1
fi

echo ""
echo "Creating backup before cleanup..."
BACKUP_DIR="svelte-backup-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup files
[ -d "src" ] && cp -r src "$BACKUP_DIR/"
[ -f "svelte.config.js" ] && cp svelte.config.js "$BACKUP_DIR/"
[ -f "tsconfig.json" ] && cp tsconfig.json "$BACKUP_DIR/"
[ -f "vite.config.ts" ] && cp vite.config.ts "$BACKUP_DIR/"
[ -f "tailwind.config.js" ] && cp tailwind.config.js "$BACKUP_DIR/"

echo "✅ Backup created in $BACKUP_DIR/"
echo ""
echo "Removing SvelteKit files..."

# Remove SvelteKit directories
rm -rf src/

# Remove SvelteKit config files
rm -f svelte.config.js
rm -f vite.config.ts  # Root vite config (keep client/vite.config.ts)
rm -f tsconfig.json   # Root tsconfig (keep client/tsconfig.json)
rm -f tailwind.config.js  # Root tailwind config (keep client/tailwind.config.js)

# Remove SMUI theme files and directories
rm -rf src/theme/
rm -f static/smui.css
rm -f static/smui-dark.css

# Remove SvelteKit build artifacts
rm -rf .svelte-kit/
rm -rf build/

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Removed:"
echo "  ✓ src/ directory"
echo "  ✓ svelte.config.js"
echo "  ✓ vite.config.ts (root)"
echo "  ✓ tsconfig.json (root)"
echo "  ✓ tailwind.config.js (root)"
echo "  ✓ SMUI theme files"
echo "  ✓ .svelte-kit/"
echo ""
echo "💾 Backup available at: $BACKUP_DIR/"
echo ""
echo "Next steps:"
echo "  1. Test the application: npm run dev"
echo "  2. If everything works, you can delete: $BACKUP_DIR/"
echo ""

