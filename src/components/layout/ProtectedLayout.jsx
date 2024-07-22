import React from 'react';
import Layout from './Layout';
import ProtectedRoute from '../ProtectedRoute';

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Layout />
  </ProtectedRoute>
);

export default ProtectedLayout;