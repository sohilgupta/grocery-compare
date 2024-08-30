import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface PriceData {
  item: string;
  price: string;
  link: string;
  image: string;
  description: string;
  merchant: string;
}

interface ItemResults {
  [key: string]: PriceData[];
}

const PriceComparison: React.FC = () => {
  const [items, setItems] = useState<string>('');
  const [results, setResults] = useState<ItemResults>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults({});

    const itemList = items.split(',').map(item => item.trim());
    console.log('Searching for items:', itemList);

    try {
      const responses = await Promise.all(
        itemList.map(item => axios.get(`http://localhost:5000/api/prices/${item}`))
      );
      const newResults: ItemResults = {};
      responses.forEach((response, index) => {
        console.log(`Response for ${itemList[index]}:`, response.data);
        newResults[itemList[index]] = response.data;
      });
      console.log('All results:', newResults);
      setResults(newResults);
    } catch (err) {
      setError('Failed to fetch prices. Please try again.');
      console.error('Error fetching prices:', err);
    } finally {
      setLoading(false);
    }
  }, [items]);

  return (
    <Container>
      <Title>Price Comparison</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="Enter grocery items (comma-separated)"
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Compare Prices'}
        </Button>
      </Form>

      {error && <Error>{error}</Error>}

      <ResultsContainer>
        {Object.entries(results).map(([item, itemResults]) => (
          <ItemColumn key={item}>
            <ItemTitle>{item}</ItemTitle>
            <ResultsList>
              {itemResults.length > 0 ? (
                itemResults.map((result, index) => (
                  <ResultItem key={index}>
                    <ProductImage src={result.image} alt={result.item} />
                    <ProductInfo>
                      <ProductName>{result.item}</ProductName>
                      <Price>₹{result.price}</Price>
                      <Merchant>{result.merchant}</Merchant>
                      <ProductLink href={result.link} target="_blank" rel="noopener noreferrer">View Product</ProductLink>
                    </ProductInfo>
                  </ResultItem>
                ))
              ) : (
                <NoResults>No results found for this item.</NoResults>
              )}
            </ResultsList>
          </ItemColumn>
        ))}
      </ResultsContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #1d1d1f;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 60%;
  padding: 15px 20px;
  font-size: 18px;
  border: none;
  border-radius: 10px 0 0 10px;
  background-color: #f5f5f7;
  outline: none;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0077ed;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: #ff3b30;
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ResultsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
`;

const ItemColumn = styled.div`
  flex: 0 0 300px;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ItemTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1d1d1f;
  text-align: center;
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  background-color: #f5f5f7;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1d1d1f;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 5px;
`;

const Merchant = styled.p`
  font-size: 14px;
  color: #86868b;
  margin-bottom: 10px;
`;

const ProductLink = styled.a`
  display: inline-block;
  padding: 8px 16px;
  background-color: #0071e3;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0077ed;
  }
`;

const NoResults = styled.p`
  text-align: center;
  color: #86868b;
  font-style: italic;
`;

export default PriceComparison;