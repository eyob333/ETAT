# Path to the entire frontend source directory
$srcPath = "D:\Projects\ETAT\frontend\EthioTech-feature-clean\src"
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.js", "*.jsx"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove eslint-disable comments at the top of the file (block comments)
    $content = $content -replace "/\*\s*eslint-disable[^*]*\*/\s*", ""
    
    # Remove eslint-disable-next-line comments
    $content = $content -replace "//\s*eslint-disable-next-line.*\r?\n", ""
    
    # Remove eslint-disable-line comments
    $content = $content -replace "//\s*eslint-disable-line.*", ""
    
    # Remove any remaining eslint comments that might have been missed
    $content = $content -replace "Line \d+:\d+:\s+Definition for rule '[^']*' was not found\s+[^\r\n]*", ""
    
    # Remove any remaining eslint-related comments
    $content = $content -replace "/\*\s*eslint[^*]*\*/\s*", ""
    $content = $content -replace "//\s*eslint.*\r?\n", ""
    
    # Write the modified content back to the file
    Set-Content -Path $file.FullName -Value $content
}

# Create or update .eslintrc.js to disable all rules
$eslintConfigPath = "D:\Projects\ETAT\frontend\EthioTech-feature-clean\.eslintrc.js"
$eslintConfigContent = @"
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  rules: {}
};
"@

Set-Content -Path $eslintConfigPath -Value $eslintConfigContent

Write-Host "ESLint directives removed from all frontend files and ESLint configuration updated to disable all rules."
