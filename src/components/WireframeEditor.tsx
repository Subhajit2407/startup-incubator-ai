import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Layout as LayoutIcon, 
  Image, 
  Type, 
  Square, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Undo2, 
  Redo2, 
  Download, 
  Upload,
  Save, 
  Grid as GridIcon,
  MousePointer,
  Trash2,
  Move,
  ShoppingBag,
  Navigation,
  X,
  Layers
} from 'lucide-react';

// Types
type ComponentType = 'header' | 'text' | 'image' | 'button' | 'card' | 'section' | 'footer';
type GridSize = 'none' | 'small' | 'medium' | 'large';

interface DropItemProps {
  id: string;
  type: ComponentType;
  left: number;
  top: number;
  width: number;
  height: number;
  content?: string;
  style?: React.CSSProperties;
}

interface WireframeEditorProps {
  initialComponents?: DropItemProps[];
  onSave?: (components: DropItemProps[]) => void;
}

// Draggable palette item component
const PaletteItem = ({ type, icon }: { type: ComponentType, icon: React.ReactNode }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));
  
  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 p-2 border rounded-md cursor-move 
                 ${isDragging ? 'opacity-50' : 'opacity-100'}
                 hover:bg-gray-100 dark:hover:bg-gray-800 
                 border-gray-200 dark:border-gray-700
                 bg-white dark:bg-gray-900`}
    >
      {icon}
      <span className="text-sm">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
    </div>
  );
};

// Draggable and resizable component
const DraggableComponent = ({
  id,
  type,
  left,
  top,
  width,
  height,
  content,
  onSelect,
  onMove,
  onResize,
  onDelete,
  isSelected,
  gridSize
}: DropItemProps & {
  onSelect: (id: string) => void;
  onMove: (id: string, left: number, top: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  gridSize: GridSize;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  
  // Calculate snap value based on grid size
  const getSnapValue = (value: number): number => {
    const gridSizeMap = {
      'none': 1,
      'small': 4,
      'medium': 8,
      'large': 16
    };
    const snapSize = gridSizeMap[gridSize];
    return Math.round(value / snapSize) * snapSize;
  };
  
  // Mouse down handler for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    onSelect(id);
    
    // Start dragging
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Mouse move handler for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    
    // Apply snapping based on grid size
    const newLeft = getSnapValue(left + dx);
    const newTop = getSnapValue(top + dy);
    
    onMove(id, newLeft, newTop);
    setStartPos({ x: e.clientX, y: e.clientY });
  };
  
  // Mouse up handler for dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleResizeMove);
  };
  
  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width, height });
    
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !ref.current) return;
    
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    
    // Apply snapping based on grid size
    const newWidth = getSnapValue(startSize.width + dx);
    const newHeight = getSnapValue(startSize.height + dy);
    
    // Enforce minimum sizes
    const minWidth = 50;
    const minHeight = 30;
    
    onResize(
      id, 
      Math.max(newWidth, minWidth), 
      Math.max(newHeight, minHeight)
    );
  };
  
  // Add CSS for better text visibility on white backgrounds
  useEffect(() => {
    // Add a style tag if it doesn't exist
    if (!document.getElementById('wireframe-text-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'wireframe-text-styles';
      styleTag.innerHTML = `
        .wireframe-text p, .wireframe-text div, .wireframe-text span {
          color: #000000 !important;
          text-shadow: 0px 0px 1px rgba(255,255,255,0.5);
        }
      `;
      document.head.appendChild(styleTag);
    }
    
    return () => {
      // Clean up on unmount
      const styleTag = document.getElementById('wireframe-text-styles');
      if (styleTag) {
        document.head.removeChild(styleTag);
      }
    };
  }, []);
  
  // Render different components based on type
  const renderComponent = () => {
    switch (type) {
      case 'header':
        return (
          <div className="w-full h-full flex items-center p-2 bg-gray-100">
            <div className="font-bold text-lg mr-auto">Logo</div>
            <div className="flex space-x-4">
              <div className="cursor-pointer">Home</div>
              <div className="cursor-pointer">About</div>
              <div className="cursor-pointer">Contact</div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="w-full h-full p-2 wireframe-text">
            <p className="text-gray-800">{content || 'Text block. Double-click to edit.'}</p>
          </div>
        );
      case 'image':
        return (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        );
      case 'button':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              {content || 'Button'}
            </button>
          </div>
        );
      case 'card':
        return (
          <div className="w-full h-full p-2 border rounded-md bg-white">
            <div className="w-full h-16 bg-gray-200 mb-2"></div>
            <h3 className="font-bold">Product Title</h3>
            <p className="text-sm">Product description goes here</p>
            <div className="mt-2 font-bold">$99.99</div>
          </div>
        );
      case 'section':
        return (
          <div className="w-full h-full p-4 bg-gray-50 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Section Title</h2>
            <p className="text-center">This is a section description. Add content here.</p>
          </div>
        );
      case 'footer':
        return (
          <div className="w-full h-full p-4 bg-gray-800 text-white flex justify-between">
            <div>© 2023 Company</div>
            <div className="flex space-x-4">
              <div>Privacy</div>
              <div>Terms</div>
              <div>Contact</div>
            </div>
          </div>
        );
      default:
        return <div className="w-full h-full p-2 bg-gray-100">Unknown component</div>;
    }
  };
  
  return (
    <div
      ref={ref}
      className={`absolute ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isSelected ? 10 : 1,
        pointerEvents: 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onMouseDown={handleMouseDown}
    >
      {renderComponent()}
      
      {/* Resize handle */}
      {isSelected && (
        <>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
            onMouseDown={handleResizeStart}
          />
          <div
            className="absolute -top-6 right-0 flex"
          >
            <button
              className="p-1 bg-red-500 text-white rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 size={12} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Main drop zone for the wireframe
const DropZone = ({
  components,
  onDrop,
  onSelect,
  onMove,
  onResize,
  onDelete,
  selectedId,
  gridSize,
  showGrid
}: {
  components: DropItemProps[];
  onDrop: (type: ComponentType, x: number, y: number) => void;
  onSelect: (id: string | null) => void;
  onMove: (id: string, left: number, top: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
  gridSize: GridSize;
  showGrid: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: { type: ComponentType }, monitor) => {
      if (!ref.current) return;
      
      const bounds = ref.current.getBoundingClientRect();
      const dropPoint = monitor.getClientOffset();
      
      if (dropPoint) {
        const x = dropPoint.x - bounds.left;
        const y = dropPoint.y - bounds.top;
        onDrop(item.type, x, y);
      }
    }
  }));
  
  // Combine the refs
  const combinedRef = (el: HTMLDivElement) => {
    ref.current = el;
    drop(el);
  };
  
  // Grid pattern styles based on grid size
  const getGridStyle = () => {
    if (!showGrid) return {};
    
    const gridSizeMap = {
      'none': '0',
      'small': '8px',
      'medium': '16px',
      'large': '32px'
    };
    
    return {
      backgroundImage: `
        linear-gradient(to right, rgba(100, 100, 100, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(100, 100, 100, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: `${gridSizeMap[gridSize]} ${gridSizeMap[gridSize]}`,
    };
  };
  
  return (
    <div
      ref={combinedRef}
      className="relative w-full h-full border-2 border-dashed border-gray-300 overflow-auto bg-white"
      style={{
        minHeight: '600px',
        ...getGridStyle()
      }}
      onClick={() => onSelect(null)}
    >
      {components.map(component => (
        <DraggableComponent
          key={component.id}
          {...component}
          onSelect={onSelect}
          onMove={onMove}
          onResize={onResize}
          onDelete={onDelete}
          isSelected={selectedId === component.id}
          gridSize={gridSize}
        />
      ))}
    </div>
  );
};

// Properties panel for selected component
const PropertiesPanel = ({
  selectedComponent,
  onUpdateComponent
}: {
  selectedComponent: DropItemProps | null;
  onUpdateComponent: (id: string, updates: Partial<DropItemProps>) => void;
}) => {
  if (!selectedComponent) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Select a component to edit its properties</p>
      </div>
    );
  }
  
  return (
    <div className="p-4 space-y-4">
      <div>
        <Label className="text-xs text-gray-500">Position</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <Label className="text-xs">X</Label>
            <Input
              type="number"
              value={selectedComponent.left}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  onUpdateComponent(selectedComponent.id, { left: value });
                }
              }}
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs">Y</Label>
            <Input
              type="number"
              value={selectedComponent.top}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  onUpdateComponent(selectedComponent.id, { top: value });
                }
              }}
              className="h-8"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-xs text-gray-500">Size</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <Label className="text-xs">Width</Label>
            <Input
              type="number"
              value={selectedComponent.width}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 50) {
                  onUpdateComponent(selectedComponent.id, { width: value });
                }
              }}
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs">Height</Label>
            <Input
              type="number"
              value={selectedComponent.height}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 30) {
                  onUpdateComponent(selectedComponent.id, { height: value });
                }
              }}
              className="h-8"
            />
          </div>
        </div>
      </div>
      
      {selectedComponent.type === 'text' && (
        <div>
          <Label className="text-xs text-gray-500">Content</Label>
          <Input
            value={selectedComponent.content || ''}
            onChange={(e) => {
              onUpdateComponent(selectedComponent.id, { content: e.target.value });
            }}
            className="mt-1"
          />
        </div>
      )}
      
      {selectedComponent.type === 'button' && (
        <div>
          <Label className="text-xs text-gray-500">Button Text</Label>
          <Input
            value={selectedComponent.content || 'Button'}
            onChange={(e) => {
              onUpdateComponent(selectedComponent.id, { content: e.target.value });
            }}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

// Main wireframe editor component
const WireframeEditor: React.FC<WireframeEditorProps> = ({ initialComponents = [], onSave }) => {
  const [components, setComponents] = useState<DropItemProps[]>(initialComponents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [gridSize, setGridSize] = useState<GridSize>('medium');
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<DropItemProps[][]>([initialComponents]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Get selected component
  const selectedComponent = selectedId 
    ? components.find(c => c.id === selectedId) || null 
    : null;
  
  // Generate unique ID
  const generateId = () => `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle dropping a new component
  const handleDrop = (type: ComponentType, x: number, y: number) => {
    // Default sizes for different component types
    const defaultSizes: Record<ComponentType, { width: number, height: number }> = {
      header: { width: 800, height: 60 },
      text: { width: 300, height: 100 },
      image: { width: 300, height: 200 },
      button: { width: 120, height: 40 },
      card: { width: 250, height: 300 },
      section: { width: 800, height: 400 },
      footer: { width: 800, height: 100 }
    };
    
    const { width, height } = defaultSizes[type];
    
    const newComponent: DropItemProps = {
      id: generateId(),
      type,
      left: x,
      top: y,
      width,
      height,
      content: type === 'text' ? 'Text content' : (type === 'button' ? 'Button' : undefined)
    };
    
    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    setSelectedId(newComponent.id);
    
    // Add to history
    addToHistory(newComponents);
  };
  
  // Handle component selection
  const handleSelectComponent = (id: string | null) => {
    setSelectedId(id);
  };
  
  // Handle component movement
  const handleMoveComponent = (id: string, left: number, top: number) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === id ? { ...component, left, top } : component
      )
    );
  };
  
  // Handle component resizing
  const handleResizeComponent = (id: string, width: number, height: number) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === id ? { ...component, width, height } : component
      )
    );
  };
  
  // Handle component deletion
  const handleDeleteComponent = (id: string) => {
    const newComponents = components.filter(component => component.id !== id);
    setComponents(newComponents);
    setSelectedId(null);
    
    // Add to history
    addToHistory(newComponents);
  };
  
  // Handle component updates
  const handleUpdateComponent = (id: string, updates: Partial<DropItemProps>) => {
    const newComponents = components.map(component => 
      component.id === id ? { ...component, ...updates } : component
    );
    
    setComponents(newComponents);
    
    // Add to history if position or size changes
    if ('left' in updates || 'top' in updates || 'width' in updates || 'height' in updates) {
      // We don't add every small change to avoid flooding history
      // Instead, we update the last history entry
      setHistory(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0) {
          newHistory[newHistory.length - 1] = newComponents;
        }
        return newHistory;
      });
    }
  };
  
  // History management
  const addToHistory = (newComponents: DropItemProps[]) => {
    // If we're not at the end of the history, truncate
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newComponents]);
    
    // Limit history size to prevent memory issues
    if (newHistory.length > 30) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  // Undo action
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setComponents(history[newIndex]);
    }
  };
  
  // Redo action
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setComponents(history[newIndex]);
    }
  };
  
  // Toggle grid
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  // Export as image
  const handleExport = () => {
    const editor = document.getElementById('wireframe-editor');
    if (!editor) return;
    
    // Create a clone with absolute positioning
    const clone = editor.cloneNode(true) as HTMLElement;
    clone.style.backgroundColor = 'white';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Use html2canvas to create a snapshot
    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(clone, { 
        scale: 2,
        logging: false,
        backgroundColor: 'white'
      }).then(canvas => {
        try {
          // Convert to image and download
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = 'wireframe-export.png';
          link.href = image;
          document.body.appendChild(link); // Append to body to ensure it works in all browsers
          link.click();
          document.body.removeChild(link);
          
          // Clean up
          document.body.removeChild(clone);
        } catch (error) {
          console.error('Error exporting wireframe:', error);
          alert('Failed to export wireframe. Please try again.');
          document.body.removeChild(clone);
        }
      });
    }).catch(error => {
      console.error('Error loading html2canvas:', error);
      alert('Failed to load export functionality. Please try again.');
      document.body.removeChild(clone);
    });
  };
  
  // Save wireframe
  const handleSave = () => {
    localStorage.setItem('wireframe-components', JSON.stringify(components));
    if (onSave) {
      onSave(components);
    }
    
    // Also offer to download as JSON file
    const dataStr = JSON.stringify(components, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.download = 'wireframe-components.json';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };
  
  // Import wireframe from file
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const importedComponents = JSON.parse(content) as DropItemProps[];
          
          setComponents(importedComponents);
          setHistory([...history, importedComponents]);
          setHistoryIndex(history.length);
          
          // Also save to localStorage
          localStorage.setItem('wireframe-components', content);
          
          alert('Wireframe imported successfully!');
        } catch (error) {
          console.error('Error importing wireframe:', error);
          alert('Failed to import wireframe. Please check the file format.');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };
  
  // Load from local storage if no initial components
  useEffect(() => {
    if (initialComponents.length === 0) {
      const savedComponents = localStorage.getItem('wireframe-components');
      if (savedComponents) {
        try {
          const parsed = JSON.parse(savedComponents);
          setComponents(parsed);
          setHistory([parsed]);
          setHistoryIndex(0);
        } catch (e) {
          console.error('Failed to parse saved components', e);
        }
      }
    }
  }, [initialComponents]);
  
  // Component categories for the palette
  const componentCategories = [
    {
      name: 'Layout',
      components: [
        { type: 'header' as ComponentType, icon: <Navigation size={16} /> },
        { type: 'section' as ComponentType, icon: <Layers size={16} /> },
        { type: 'footer' as ComponentType, icon: <LayoutIcon size={16} /> },
      ]
    },
    {
      name: 'Basic',
      components: [
        { type: 'text' as ComponentType, icon: <Type size={16} /> },
        { type: 'button' as ComponentType, icon: <Square size={16} /> },
        { type: 'image' as ComponentType, icon: <Image size={16} /> },
      ]
    },
    {
      name: 'E-commerce',
      components: [
        { type: 'card' as ComponentType, icon: <ShoppingBag size={16} /> },
      ]
    }
  ];
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Toolbar */}
        <div className="p-2 bg-gray-800 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              className="p-1 rounded hover:bg-gray-700"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo2 size={16} />
            </button>
            <button 
              className="p-1 rounded hover:bg-gray-700"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo2 size={16} />
            </button>
            <Separator orientation="vertical" className="h-6 bg-gray-600" />
            <button 
              className={`p-1 rounded ${showGrid ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={handleToggleGrid}
            >
              <GridIcon size={16} />
            </button>
            <Separator orientation="vertical" className="h-6 bg-gray-600" />
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded hover:bg-gray-700">
                <AlignLeft size={16} />
              </button>
              <button className="p-1 rounded hover:bg-gray-700">
                <AlignCenter size={16} />
              </button>
              <button className="p-1 rounded hover:bg-gray-700">
                <AlignRight size={16} />
              </button>
            </div>
          </div>
          
          <div className="text-lg font-bold">Wireframe Editor</div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="px-3 py-1 rounded hover:bg-gray-700"
              onClick={handleImport}
            >
              <div className="flex items-center">
                <Upload size={16} className="mr-1" />
                <span>Import</span>
              </div>
            </button>
            <button 
              className="px-3 py-1 rounded hover:bg-gray-700"
              onClick={handleExport}
            >
              <div className="flex items-center">
                <Download size={16} className="mr-1" />
                <span>Export</span>
              </div>
            </button>
            <button 
              className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              <div className="flex items-center">
                <Save size={16} className="mr-1" />
                <span>Save</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar - Component palette */}
          <div className="w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            
            <div className="space-y-4">
              {componentCategories.map(category => (
                <div key={category.name}>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{category.name}</h3>
                  <div className="space-y-2">
                    {category.components.map(component => (
                      <PaletteItem
                        key={component.type}
                        type={component.type}
                        icon={component.icon}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Grid Settings</h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Grid Size</Label>
                  <select
                    className="w-full mt-1 h-8 rounded border border-gray-300 text-sm"
                    value={gridSize}
                    onChange={(e) => setGridSize(e.target.value as GridSize)}
                  >
                    <option value="none">None</option>
                    <option value="small">Small (8px)</option>
                    <option value="medium">Medium (16px)</option>
                    <option value="large">Large (32px)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main editor area */}
          <div className="flex-1 overflow-hidden">
            <div id="wireframe-editor" className="w-full h-full">
              <DropZone
                components={components}
                onDrop={handleDrop}
                onSelect={handleSelectComponent}
                onMove={handleMoveComponent}
                onResize={handleResizeComponent}
                onDelete={handleDeleteComponent}
                selectedId={selectedId}
                gridSize={gridSize}
                showGrid={showGrid}
              />
            </div>
          </div>
          
          {/* Right sidebar - Properties panel */}
          <div className="w-64 border-l border-gray-200 bg-white overflow-y-auto">
            <div className="p-3 border-b border-gray-200 font-medium">
              Properties
            </div>
            <PropertiesPanel
              selectedComponent={selectedComponent}
              onUpdateComponent={handleUpdateComponent}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default WireframeEditor;