import { Icon } from '../../ui/Icon'
import { Toolbar } from '../../ui/Toolbar'
import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import { Editor } from '@tiptap/react'

import { DropdownButton } from '../../ui/Dropdown'
import useContentItemActions from './hooks/useContentItemActions'
import { useData } from './hooks/useData'
import { useEffect, useState } from 'react'
import { Clipboard, Copy, GripVertical, Plus, RemoveFormatting, Trash2 } from 'lucide-react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover'

export type ContentItemMenuProps = {
  editor: Editor
}

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useData()
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta('lockDragHandle', true)
    } else {
      editor.commands.setMeta('lockDragHandle', false)
    }
  }, [editor, menuOpen])

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-0.5">
        <Toolbar.Button onClick={actions.handleAdd}>
          <Icon Icon={Plus} />
        </Toolbar.Button>

        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger asChild>
            <Toolbar.Button>
              <Icon Icon={GripVertical} />
            </Toolbar.Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" sideOffset={8} className="p-2 flex flex-col min-w-[16rem] ">
            <PopoverClose>
              <DropdownButton onClick={actions.resetTextFormatting}>
                <Icon Icon={RemoveFormatting} />
                Clear formatting
              </DropdownButton>
            </PopoverClose>
            <PopoverClose>
              <DropdownButton onClick={actions.copyNodeToClipboard}>
                <Icon Icon={Clipboard} />
                Copy to clipboard
              </DropdownButton>
            </PopoverClose>
            <PopoverClose>
              <DropdownButton onClick={actions.duplicateNode}>
                <Icon Icon={Copy} />
                Duplicate
              </DropdownButton>
            </PopoverClose>
            <Toolbar.Divider horizontal />
            <PopoverClose>
              <DropdownButton
                onClick={actions.deleteNode}
                className="text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
              >
                <Icon Icon={Trash2} />
                Delete
              </DropdownButton>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      </div>
    </DragHandle>
  )
}
