export const Colors ={
    primary:"#186351",
    secondary:"#87D1A4",
    whiteaccent:"#FFF5E2",
    black:"#000000",
    golden:'#F1C54E'
};

export const getAppColors = (theme) => {
  const isDark = theme === 'dark';

  return {
    primary: isDark ? "#87D1A4" : "#186351",
    secondary: isDark ? "#1e1e1e" : "#87D1A4",
    whiteaccent: isDark ? "#121212" : "#FFF5E2",
    black: "#000000",
    golden: '#F1C54E',
    text: isDark ? "#ffffff" : "#000000",
    background: isDark ? "#000000" : "#ffffff"
  };
};