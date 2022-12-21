// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const mockFetch = async (url: string) => {
  let response: unknown;

  switch (true) {
    case url.includes('locations'):
      response = {
        Netherlands: [
          [75061, 'Amsterdam'],
          [74866, 'Utrecht'],
        ],
        'United Kingdom': [
          [21, 'Edinburgh'],
          [67204, 'York'],
        ],
      };
      break;
    case url.includes('available_dates'):
      response = [
        '2021-07-30',
        '2021-07-31',
        '2021-08-01',
        '2021-08-02',
        '2021-08-03',
        '2021-08-05',
        '2021-08-06',
        '2021-08-07',
      ];
      break;
    case url.includes('products'):
      response = [
        {
          product_url:
            'https://www.tiqets.com/en/amsterdam-c75061/rijksmuseum-all-the-rembrandts-exhibition-p977147',
          image:
            'https://aws-tiqets-cdn.imgix.net/images/content/309da18397074a6e90bf7e8dc5785242.jpg?auto=format&fit=crop&ixlib=python-1.1.2&q=70&s=8d1e9a19b51481d534d60e95f4eab2c5',
          id: 977147,
          title: 'Rijksmuseum & All the Rembrandts Exhibition',
          price: 20,
          summary:
            "Marking the 350th anniversary of Rembrandt's death, the Rijksmuseum is celebrating the Dutch master with a truly special exhibition. _All the Rembrandts_ brings together the Rijksmuseum's entire collection of Rembrandt's works (the largest in the world), presenting them all together for the first time ever. It's a rare opportunity to lift the veil on one of the most important artists in history and discover the moving stories that live on in his brushstrokes.",
          city_id: 75061,
          available_dates: ['2021-07-31'],
        },
      ];
      break;
    default:
      break;
  }

  return {
    ok: true,
    status: 200,
    json: async () => response,
  };
};

beforeAll(() => {
  jest.spyOn(window, 'fetch');
});
beforeEach(() => {
  (window.fetch as jest.Mock).mockImplementation(mockFetch);
});
