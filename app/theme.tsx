// app/theme.tsx
"use client";  // 添加这一行来标记文件为客户端组件

import { useEffect } from 'react';

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
