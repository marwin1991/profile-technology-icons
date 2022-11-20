import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: '#ffffff',
    height: 50,
    boxShadow: "6px 6px 8px 0 rgba(0, 0, 0, 0.25), -4px -4px 6px 0 rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    margin: 15
  };
  
  return (
    <img alt={props.id} ref={setNodeRef} style={style} {...attributes} {...listeners} src={props.link} />
  );
}