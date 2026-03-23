import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Add this
import App from '../src/App';

describe('Project Build Integrity', () => {
  it('should render the App without crashing', () => {
    // Wrap App in MemoryRouter so hooks like useLocation() work
    const { baseElement } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(baseElement).toBeDefined();
  });
});