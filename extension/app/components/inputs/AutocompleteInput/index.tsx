import { FC, forwardRef, useCallback, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { AppInputProps } from '../AppInput/AppInput';
import { createClassName } from '../../../../common/common-helpers';
import { AppDropdown, AppDropdownRefs } from '../../dropdowns/AppDropdown/AppDropdown';

export type AutocompleteInputProps = AppInputProps & {
  Input: FC<AppInputProps>;
  onValueSelect?: (value: string) => void;
  countSymbolsToActivate?: number;
  list?: string[];
};

export type AutocompleteInputRefs = AppDropdownRefs;

export const AutocompleteInput = forwardRef<AppDropdownRefs, AutocompleteInputProps>(({
  Input,
  className = '',
  value = '',
  onValueSelect,
  countSymbolsToActivate = 3,
  list = [],
}, ref) => {
  const [isOpen, setIsOpened] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [autocompleteItems, setAutocompleteItems] = useState(list);
  const [activeIndex, setActiveIndex] = useState(-1);

  const onValueSelectHandle = useCallback((val: string) => {
    setIsOpened(false);
    setInputValue(val);
    setActiveIndex(-1);
    onValueSelect?.(val);
  }, [onValueSelect]);

  const prepareItems = useCallback((items: string[], item: string) => {
    return items
      .filter(i => i && item && i.toLowerCase().indexOf(item.toLowerCase()) > -1);
  }, []);

  useEffect(() => {
    setAutocompleteItems(prepareItems(list, inputValue));
    setActiveIndex(-1);
  }, [inputValue, list, prepareItems]);

  return (
    <AppDropdown
      ref={ref}
      opener={<></>}
      opened={isOpen && list?.length > 0}
      className={createClassName(['autocomplete-dropdown', className])}
      classNameMenu={createClassName(['autocomplete-dropdown-menu', className])}
      header={
        <Input
          value={inputValue}
          className={createClassName(['autocomplete-input', className])}
          onKeyDown={(e) => {
            if (!isOpen) {
              if (activeIndex > -1) {
                setActiveIndex(-1);
              }
              return;
            }
            if (
              e.key === 'ArrowDown'
              || e.key === 'ArrowUp'
              || e.key === 'Enter'
            ) {
              e.stopPropagation();
              e.preventDefault();
            }

            if (
              e.key === 'ArrowDown' && activeIndex < autocompleteItems.length - 1
            ) {
              setActiveIndex(activeIndex + 1);
            }

            if (e.key === 'ArrowUp' && activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }

            if (e.key === 'Enter') {
              onValueSelectHandle(autocompleteItems[activeIndex]);
            }
          }}
          onType={(v) => {
            setInputValue(v);
            setAutocompleteItems(prepareItems(list, v));
            if (v.length < countSymbolsToActivate && isOpen) {
              setActiveIndex(-1);
              return setIsOpened(false);
            }
            if (v.length >= countSymbolsToActivate && !isOpen) {
              setIsOpened(true);
            }
          }}
        />
      }
    >
      <SimpleBar>
        {
          autocompleteItems
            .map((item, index) => {
              return (
                <div
                  key={item}
                  className={createClassName([
                    'autocomplete-item',
                    index === activeIndex ? 'active' : '',
                  ])}
                  onMouseEnter={() => {
                    if (activeIndex !== index) {
                      setActiveIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveIndex(-1);
                  }}
                  onClick={() => {
                    onValueSelectHandle(item);
                  }}
                >
                  {item}
                </div>
              );
            })
        }
      </SimpleBar>
    </AppDropdown>
  );
});
