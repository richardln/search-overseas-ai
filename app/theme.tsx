import { useEffect } from 'react';

// 监听用户系统主题变化
const useTheme = () => {
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // 根据初始设置应用对应的主题
    if (darkModeMediaQuery.matches) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }

    // 监听系统主题变化
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    });
  }, []);
};

export default useTheme;

