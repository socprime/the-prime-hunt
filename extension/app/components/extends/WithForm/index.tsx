import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';
import { ElementRef, WithDependedChildren } from '../../../../../common/types';
import { WithFormProps, WithFormRefs } from './types';
import { useForm } from '../../../stores';

type Props = WithDependedChildren<
  WithFormProps,
  {
    [key: string]: any;
    getValue: WithFormProps['getValue'];
    elementRef: ElementRef;
    disabled: boolean;
  }
>;

export const WithForm = forwardRef<
  WithFormRefs,
  Props
>(({
  disabled,
  getValue,
  children,
  ...restProps
}, refs) => {
  const formStore = useForm();
  const elementID = useId();
  const elementRef: ElementRef = useRef(null);

  useImperativeHandle(refs, () => {
    return {
      elementRef,
    };
  });

  useEffect(() => {
    formStore.add(elementID, {
      elementRef,
      getValue,
      validate: (restProps as any).validate,
    });

    return () => formStore.remove(elementID);
  }, []);

  return (
    <>
      {children({
        ...restProps,
        getValue,
        disabled,
        elementRef,
      })}
    </>
  );
});
