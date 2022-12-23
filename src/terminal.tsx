import React, { useState, useEffect } from 'react';
import { Text, Box, useApp, useInput, } from 'ink';
import { delete_node_module, find_node_modules } from './spwan';
import Spinner from 'ink-spinner';

enum DeleteStatus {
  deleted,
  not_deleted,
  deleting,
}

function getColor(deleteStatus: DeleteStatus) {
  switch (deleteStatus) {
    case DeleteStatus.deleted:
      return "red";
    case DeleteStatus.not_deleted:
      return "green";
    case DeleteStatus.deleting:
      return "yellow";
  }
}

const Row = ({ item, onFocus, deleteStatus }: RowProps) => {
  return <Box borderStyle={onFocus ? "single" : undefined}>
    <Text color={getColor(deleteStatus)}>
      {deleteStatus == DeleteStatus.deleting && <Spinner type="dots" />}
      {" "}
      {item}
    </Text>
  </Box>
}

export const Counter = () => {
  const { exit } = useApp();
  const [items, setItems] = useState<string[]>([]);
  const [onFocus, setOnFocus] = useState(0);
  const [deleteList, setDeleteList] = useState<DeleteStatus[]>([]);
  let max = items?.length || 0;

  useEffect(() => {
    find_node_modules(setItems, __dirname).then((paths) => {
      setItems(paths);
      setDeleteList((prev) => {
        const temp = [...prev];
        for (let i = temp.length; i < items.length; i++) {
          temp.push(DeleteStatus.not_deleted);
        }
        return temp;
      });
    });
  }, []);

  useInput((_, key) => {
    if (key.escape) {
      exit();
    }
    if (key.upArrow) {
      setOnFocus((onFocus - 1) % max);
    }
    if (key.downArrow) {
      setOnFocus((onFocus + 1) % max);
    }
    if (key.return) {
      setDeleteList((prev) => {
        const temp = [...prev];
        temp[onFocus] = DeleteStatus.deleting;
        return temp;
      })
      delete_node_module(items[onFocus]).then(() => {
        setDeleteList((prev) => {
          const temp = [...prev];
          temp[onFocus] = DeleteStatus.deleted;
          return temp;
        })
      });
    }
  });

  return <Box display="flex" flexDirection="column" >
    {items?.map((item, index) => {
      return <Row
        key={index}
        item={item}
        onFocus={onFocus === index}
        deleteStatus={deleteList[index]}
      />
    })}
  </Box>
};



interface RowProps {
  item: string;
  onFocus: boolean;
  deleteStatus: DeleteStatus;
}
