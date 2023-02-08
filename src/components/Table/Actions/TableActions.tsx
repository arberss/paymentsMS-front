import { Button } from "@mantine/core";

export interface Actions {
  type: 'edit' | 'delete' | string;
  disabled?: boolean;
  icon?: string;
  svgComponent?: any;
  text: string;
  action?: () => void;
}

export type Props<T = any> = {
  rowData?: T;
  actions: (({ rowData }: { rowData?: T }) => Actions)[];
};

const ColumnActions = <T extends unknown>(props: Props<T>): JSX.Element => {
  const { rowData, actions } = props;

  const renderActions = (): JSX.Element[] =>
    actions?.map(
      (
        item: ({ rowData }: { rowData?: T }) => void,
        index: number
      ): JSX.Element => {
        const element = item({ rowData }) as Actions | void;
        return (
          <Button
            disabled={element?.disabled}
            key={`${element?.type}-${index}`}
            onClick={(): void | null =>
              element?.action ? element?.action() : null
            }
            compact
            variant="white"
          >
            {element?.svgComponent && element.svgComponent}
            {element?.icon && <img src={element?.icon} alt='' />}
            {!element?.icon && !element?.svgComponent && element?.text}
          </Button>
        );
      }
    );

  return <>{renderActions()}</>;
};

export default ColumnActions;
