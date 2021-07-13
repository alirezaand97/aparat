import React, { memo } from 'react';
import MainLayout from 'layouts/MainLayout';
import CategorizedVideoList from 'components/CategorizedVideoList';
function HomePage() {
  return (
    <MainLayout fullWidthMain>
      <CategorizedVideoList />
    </MainLayout>
  );
}

export default memo(HomePage);
