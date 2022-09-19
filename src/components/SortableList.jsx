import React, { useState, useEffect } from 'react';
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';

export function SortableList({ techs }) {
    const [items, setItems] = useState([]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setItems(techs);
    }, [techs]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            {
                techs.length > 0 &&
                <SortableContext
                    items={items.map(i => i.name)}
                >
                    {items.map(tech => <SortableItem key={tech.name} id={tech.name} link={tech.link} />)}
                </SortableContext>
            }

        </DndContext>
    );

    function handleDragEnd(event) {
        console.log("handleDragEnd")
        const { active, over } = event;
        if (active.id !== over.id) {
            console.log("handleDragEnd if")
            console.log(items)
            setItems((items) => {
                console.log(active.id)
                console.log(over.id)
                const oldIndex = findIndexOf(active.id);
                const newIndex = findIndexOf(over.id);
                console.log(oldIndex)
                console.log(newIndex)
                let a = arrayMove(items, oldIndex, newIndex);
                console.log(a)
                return a
            });
        }
    }

    function findIndexOf(name){
        console.log("findIndexOf")
        console.log(items)
        for (let i = 0; i < items.length; i++) {
            let tech = items[i]
            if(tech.name === name){
                return i;
            }
        }

        return -1;
    }
}