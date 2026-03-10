import { Palette } from 'lucide-react';

const ThemeSelector = ({ currentTheme, onThemeChange, themes }) => {
  return (
    <div className="relative group">
      <button className="p-2 hover:bg-gray-100 rounded-lg transition flex items-center space-x-2">
        <Palette size={20} />
        <span className="hidden md:inline text-sm">Thème</span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
            Choisir un thème
          </p>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition ${
                currentTheme === theme.id ? 'bg-primary-50' : ''
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: theme.colors[600] }}
              />
              <span className={`text-sm ${
                currentTheme === theme.id ? 'font-semibold text-primary-600' : 'text-gray-700'
              }`}>
                {theme.name}
              </span>
              {currentTheme === theme.id && (
                <span className="ml-auto text-primary-600">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
