import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';

const containerProps = {
    bgcolor: '#fdfdfd',
    style: { width: '60%', minWidth: 350, minHeight: 80 },
    margin: "auto",
    boxShadow: "6px 6px 8px 0 rgba(0, 0, 0, 0.25), -4px -4px 6px 0 rgba(255, 255, 255, 0.3)"
};

export function SortableList({ techs, update }) {
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
        <Box borderRadius={16} {...containerProps} >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {
                    techs.length > 0 &&
                    <SortableContext
                        items={checked().map(i => i.name)}
                    >
                        {checked().map(tech => <SortableItem key={tech.name} id={tech.name} link={tech.link} />)}
                    </SortableContext>
                }

            </DndContext>
        </Box>
    );

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = findIndexOf(active.id);
                const newIndex = findIndexOf(over.id);
                let updated = arrayMove(items, oldIndex, newIndex);
                update(updated)
                return updated
            });
        }
    }

    function findIndexOf(name) {
        for (let i = 0; i < items.length; i++) {
            let tech = items[i]
            if (tech.name === name) {
                return i;
            }
        }
        return -1;
    }

    function checked() {
        return items.filter(item => item.checked)
    }
}