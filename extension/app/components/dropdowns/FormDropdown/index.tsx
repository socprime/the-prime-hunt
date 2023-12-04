import React, {
  useRef, MutableRefObject, useMemo, useState, useEffect, useCallback, ReactNode,
} from 'react';
import { FormDropdownProps } from './types';
import { AppArea } from '../../areas/AppArea';
import { AppDropdown } from '../AppDropdown/AppDropdown';
import { createClassName } from '../../../../common/common-helpers';
import { WithValidation } from '../../extends/WithValidation';
import { WithForm } from '../../extends/WithForm';
import { Validate, WithDependedChildren } from '../../../../../common/types';
import { useForceUpdate, useOnClickOutside, usePrevious } from '../../../app-hooks';
import { SmallArrowIcon } from '../../atoms/icons/SmallArrowIcon/SmallArrowIcon';
import { AppTag } from '../../tags/AppTag';
import './styles.scss';

export const FormDropdown: React.FC<WithDependedChildren<
  FormDropdownProps,
  {
    items: FormDropdownProps['items'];
    noItemsMessage: ReactNode;
  }
>> = ({
  multi,
  name,
  items,
  selectedItem,
  label,
  children,
  disabled,
  validators,
  className = '',
  classNameMenu = '',
  onChange,
  ...restProps
}) => {
  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dropdownMenuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const multiRef = useRef<boolean>(!!multi);
  multiRef.current = !!multi;
  const prevSelectedItemID = usePrevious(selectedItem?.id);

  const update = useForceUpdate();
  const currentItemsRef = useRef<FormDropdownProps['items']>(
    [
      ...(selectedItem ? [selectedItem] : []),
    ],
  );

  const addItem = useCallback((
    item: FormDropdownProps['items'][0],
    ifNew = false,
  ) => {
    let ifAlreadyExists = false;
    currentItemsRef.current = [
      ...currentItemsRef.current.filter((i) => {
        if (!multiRef.current) {
          i.isSelected = false;
        }
        const { id } = i;
        if (id === item.id) {
          ifAlreadyExists = true;
          return false;
        }
        return true;
      }),
      ...(ifNew && ifAlreadyExists ? [] : [item]),
    ];
    const isSelected = !ifNew || !ifAlreadyExists;
    if (!multiRef.current) {
      currentItemsRef.current = !ifAlreadyExists ? [item] : [];
    }
    item.isSelected = isSelected;
    onChange?.(currentItemsRef.current);
    update();
  }, [onChange, update]);

  useEffect(() => {
    if (
      selectedItem
      && selectedItem.id !== prevSelectedItemID
      && !currentItemsRef.current.find(({ id }) => id === selectedItem.id)
    ) {
      selectedItem.isSelected = true;
      currentItemsRef.current.push(selectedItem);
      update();
    }
  }, [update, prevSelectedItemID, selectedItem]);

  const [isClosed, setIsClosed] = useState(true);
  const normalizedItems = useMemo(() => {
    return (items || []).map((i) => {
      return {
        ...i,
        onClick: () => {
          addItem(i, true);
          setTimeout(() => {
            formDropdownRefs.current.validate?.(['blur']);
          }, 0);
        },
      };
    });
  }, [addItem, items]);

  const formDropdownRefs: MutableRefObject<{
    validate?: Validate;
  }> = useRef({});

  useOnClickOutside(() => {
    setIsClosed(true);
  }, dropdownRef, dropdownMenuRef);

  return (
    <WithValidation
      getValue={() => {
        const item = currentItemsRef.current[0];
        if (multi) {
          return currentItemsRef.current || [];
        }
        return !item ? [] : [item];
      }}
      disabled={!!disabled}
      validators={[
        ...(validators || []),
      ]}
    >
      {(withValidationProps) => {
        formDropdownRefs.current.validate = withValidationProps.validate;
        return (
          <WithForm
            {...withValidationProps}
          >
            {(withFormProps) => {
              return (
                <div
                  onClick={() => {
                    setIsClosed(!isClosed);
                  }}
                >
                  <AppDropdown
                    {...withFormProps}
                    {...restProps}
                    ref={(refs) => {
                      if (refs?.dropdown?.current) {
                        (refs.dropdown.current as any).name = name;
                        dropdownRef.current = refs.dropdown.current;
                        withValidationProps.elementRef.current = dropdownRef.current;
                        withFormProps.elementRef.current = dropdownRef.current;
                      }
                      if (refs?.dropdownMenu?.current) {
                        dropdownMenuRef.current = refs.dropdownMenu.current;
                      }
                    }}
                    closed={isClosed}
                    header={label}
                    className={createClassName([
                      'form-dropdown',
                      className,
                    ])}
                    opener={
                      <AppArea
                        native={{
                          tabIndex: 0,
                          className: createClassName([
                            'form-area',
                            multi ? 'multi' : '',
                          ]),
                          onBlur: withFormProps.onBlur,
                        }}
                      >
                        {multi && (currentItemsRef.current || []).map((item) => {
                          const { content, id } = item;
                          return (
                            <AppTag
                              key={id}
                              native={{
                                onClick: (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if ((e.target as HTMLDivElement).classList.contains('tag')) {
                                    return;
                                  }
                                  addItem(item, true);
                                },
                              }}
                            >
                              {content || ''}
                            </AppTag>
                          );
                        })}
                        {!multi && (currentItemsRef.current[0]?.content || '')}
                        <SmallArrowIcon />
                      </AppArea>
                    }
                    classNameMenu={createClassName([
                      'form-dropdown-menu',
                      classNameMenu,
                    ])}
                  >
                    {children({
                      items: normalizedItems,
                      noItemsMessage: <p style={{
                        padding: '8px 12px',
                        cursor: 'default',
                      }}>No items</p>,
                    })}
                  </AppDropdown>
                </div>
              );
            }}
          </WithForm>
        );
      }}
    </WithValidation>
  );
};
