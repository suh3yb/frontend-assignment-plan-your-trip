import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TripPlanner from './TripPlanner';

jest.mock('../hooks/useIntersection');

const renderAndWaitForSpinnerToDisappear = async () => {
  render(<TripPlanner />);
  await waitFor(() => {
    expect(screen.queryByText('spinner.svg')).not.toBeInTheDocument();
  });
};

describe('TripPlanner', () => {
  it('renders spinner first and then filters', async () => {
    render(<TripPlanner />);
    expect(screen.getByText('spinner.svg')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('spinner.svg')).not.toBeInTheDocument();
    });
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByText('Dates')).toBeInTheDocument();
  });

  it('renders countries but not cities initially', async () => {
    await renderAndWaitForSpinnerToDisappear();
    expect(screen.getByText('Netherlands')).toBeInTheDocument();
    expect(screen.queryByText('Amsterdam')).not.toBeInTheDocument();
  });

  it('renders cities after selecting country', async () => {
    await renderAndWaitForSpinnerToDisappear();
    fireEvent.change(screen.getByTestId('select-Country'), {
      target: { value: 'Netherlands' },
    });
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Utrecht')).toBeInTheDocument();
  });

  it('displays select a filter message when not all filters selected', async () => {
    await renderAndWaitForSpinnerToDisappear();
    expect(screen.getByText('Select filters first')).toBeInTheDocument();
  });

  it('renders products when filters are selected', async () => {
    await renderAndWaitForSpinnerToDisappear();
    expect(screen.queryByText('heading')).not.toBeInTheDocument();
    fireEvent.change(screen.getByTestId('select-Country'), {
      target: { value: 'Netherlands' },
    });
    fireEvent.change(screen.getByTestId('select-City'), {
      target: { value: 'Amsterdam' },
    });
    fireEvent.click(screen.getByLabelText(/30/g));
    await waitFor(() => {
      expect(
        screen.queryByText('Select filters first')
      ).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText('spinner.svg')).not.toBeInTheDocument();
    });
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Rijksmuseum & All the Rembrandts Exhibition'
    );
  });
});
