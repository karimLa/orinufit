import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { resetIdCounter, useCombobox } from 'downshift';
import debounce from 'lodash/debounce';

import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { IProduct } from '@/types/models';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function Search() {
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const findItemsButChill = debounce(findItems, 350);
  const items: IProduct[] = data?.searchTerms || [];

  resetIdCounter();
  const {
    inputValue,
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: { searchTerm: inputValue },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        router.push(`/product/${selectedItem.id}`);
      }
    },
    itemToString: (item) => item?.name! || '',
  });
  const nothingFound = isOpen && !items.length && !loading;

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, i) => (
            <DropDownItem
              key={item.id}
              highlighted={i === highlightedIndex}
              {...getItemProps({ item })}
            >
              <div className='img-container'>
                <Image
                  src={item.photo!.image.publicUrlTransformed}
                  alt={item.photo!.altText}
                  width='50'
                  height='60'
                />
              </div>
              {item.name}
            </DropDownItem>
          ))}
        {nothingFound && (
          <DropDownItem>Sorry, nothing found for: {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}

export default Search;
