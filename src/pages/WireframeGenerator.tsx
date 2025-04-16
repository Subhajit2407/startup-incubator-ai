import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, ArrowRight, Download, Upload, Save, 
  Settings, Eye, Code, Layers, Grid as GridIcon, 
  Zap, Trash2, Copy, Plus, Minus, RotateCw, 
  Undo2, Redo2, Move, Type, Image, Square, 
  LayoutIcon, Navigation, ShoppingBag, PanelLeft, 
  PanelRight, Monitor, Smartphone, Tablet, 
  CornerDownRight, Check, Folder, ChevronDown
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fabric } from "fabric";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { cn } from "@/lib/utils";
import { SitemapNode } from "./SitemapGenerator";
import { v4 as uuidv4 } from "uuid";

// Basic color picker component instead of react-colorful
// (You can install react-colorful with "npm install react-colorful" if preferred)
const ColorPicker = ({ color, onChange, allowTransparent = false }: { color: string, onChange: (color: string) => void, allowTransparent?: boolean }) => {
  const isTransparent = color === 'transparent';
  const displayColor = isTransparent ? '#ffffff' : color;
  
  return (
    <div className="space-y-2">
      <input
        type="color"
        value={displayColor}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 cursor-pointer"
      />
      <div className="flex items-center mt-2">
        <span className="text-xs mr-2">Hex:</span>
        <Input 
          value={displayColor} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 px-2 border rounded text-sm" 
        />
      </div>
      {allowTransparent && (
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="transparent"
            checked={isTransparent}
            onChange={(e) => onChange(e.target.checked ? 'transparent' : displayColor)}
            className="mr-2"
          />
          <Label htmlFor="transparent" className="text-xs">Transparent</Label>
        </div>
      )}
    </div>
  );
};

// Define device presets for responsive design
const devicePresets = [
  { id: "desktop", name: "Desktop", width: 1280, height: 800, icon: <Monitor size={16} /> },
  { id: "tablet", name: "Tablet", width: 768, height: 1024, icon: <Tablet size={16} /> },
  { id: "mobile", name: "Mobile", width: 375, height: 667, icon: <Smartphone size={16} /> },
];

// Define template categories
const templateCategories = [
  {
    id: "ecommerce",
    name: "E-commerce",
    templates: [
      { id: "product-listing", name: "Product Listing" },
      { id: "product-detail", name: "Product Detail" },
      { id: "shopping-cart", name: "Shopping Cart" },
      { id: "checkout", name: "Checkout" }
    ]
  },
  {
    id: "content",
    name: "Content & Media",
    templates: [
      { id: "blog-home", name: "Blog Home" },
      { id: "article", name: "Article Page" },
      { id: "gallery", name: "Gallery" },
      { id: "portfolio", name: "Portfolio" }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    templates: [
      { id: "landing-page", name: "Landing Page" },
      { id: "features", name: "Features Section" },
      { id: "pricing", name: "Pricing Page" },
      { id: "testimonials", name: "Testimonials" }
    ]
  },
  {
    id: "dashboard",
    name: "Dashboard & App",
    templates: [
      { id: "analytics", name: "Analytics Dashboard" },
      { id: "settings", name: "Settings Panel" },
      { id: "user-profile", name: "User Profile" },
      { id: "app-layout", name: "App Layout" }
    ]
  }
];

// Define component categories for the sidebar
const componentCategories = [
  {
    id: "layout",
    name: "Layout Components",
    components: [
      { id: "container", name: "Container", icon: <LayoutIcon size={16} /> },
      { id: "section", name: "Section", icon: <Square size={16} /> },
      { id: "grid", name: "Grid Layout", icon: <GridIcon size={16} /> },
      { id: "spacer", name: "Spacer", icon: <Layers size={16} /> }
    ]
  },
  {
    id: "navigation",
    name: "Navigation",
    components: [
      { id: "header", name: "Header", icon: <Navigation size={16} /> },
      { id: "navbar", name: "Navigation Bar", icon: <Navigation size={16} /> },
      { id: "menu", name: "Menu", icon: <ChevronDown size={16} /> },
      { id: "footer", name: "Footer", icon: <LayoutIcon size={16} /> }
    ]
  },
  {
    id: "content",
    name: "Content",
    components: [
      { id: "heading", name: "Heading", icon: <Type size={16} /> },
      { id: "paragraph", name: "Paragraph", icon: <Type size={16} /> },
      { id: "image", name: "Image", icon: <Image size={16} /> },
      { id: "button", name: "Button", icon: <Square size={16} /> },
      { id: "card", name: "Card", icon: <Square size={16} /> }
    ]
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    components: [
      { id: "product-card", name: "Product Card", icon: <ShoppingBag size={16} /> },
      { id: "product-list", name: "Product List", icon: <ShoppingBag size={16} /> },
      { id: "cart", name: "Cart", icon: <ShoppingBag size={16} /> },
      { id: "checkout-form", name: "Checkout Form", icon: <ShoppingBag size={16} /> }
    ]
  },
  {
    id: "forms",
    name: "Forms & Inputs",
    components: [
      { id: "form", name: "Form", icon: <Square size={16} /> },
      { id: "input", name: "Input Field", icon: <Square size={16} /> },
      { id: "checkbox", name: "Checkbox", icon: <Check size={16} /> },
      { id: "radio", name: "Radio Button", icon: <CornerDownRight size={16} /> }
    ]
  }
];

// Function to export canvas as image
const exportCanvasAsImage = (canvas: fabric.Canvas, filename: string) => {
  if (!canvas) return;
  
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1
  });
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  link.click();
};

// Generate unique ID helper function
const generateId = () => `element-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Interface for the component objects on the canvas
interface CanvasElement {
  id: string;
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  textAlign?: string;
  options?: Record<string, any>;
}

// Interface for the page data
interface WireframePage {
  id: string;
  name: string;
  canvasJson?: string;
  elements: CanvasElement[];
  devicePreset: string;
  customWidth?: number;
  customHeight?: number;
}

// Main WireframeGenerator component
const WireframeGenerator = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<WireframePage[]>([{
    id: generateId(),
    name: "Homepage",
    elements: [],
    devicePreset: "desktop"
  }]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [activeTab, setActiveTab] = useState("components");
  const [zoomLevel, setZoomLevel] = useState<number[]>([100]);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(8);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(null);
  const [selectedElementProps, setSelectedElementProps] = useState<Record<string, any>>({});
  const [isExporting, setIsExporting] = useState(false);
  const [projectName, setProjectName] = useState("My Wireframe Project");
  const [activeDevice, setActiveDevice] = useState(devicePresets[0].id);
  const [showCodeView, setShowCodeView] = useState(false);
  
  // Refs
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  
  // Get current page
  const currentPage = pages[currentPageIndex];
  
  // Initialize canvas
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    
    // Clean up any existing canvas
    if (canvasRef.current) {
      canvasRef.current.dispose();
    }
    
    // Get device dimensions
    const device = devicePresets.find(d => d.id === currentPage.devicePreset) || devicePresets[0];
    const width = currentPage.customWidth || device.width;
    const height = currentPage.customHeight || device.height;
    
    // Create new canvas
    const canvas = new fabric.Canvas('wireframe-canvas', {
      width,
      height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true
    });
    
    // Set up canvas event handlers
    canvas.on('selection:created', (e) => {
      setSelectedElement(canvas.getActiveObject());
    });
    
    canvas.on('selection:updated', (e) => {
      setSelectedElement(canvas.getActiveObject());
    });
    
    canvas.on('selection:cleared', (e) => {
      setSelectedElement(null);
    });
    
    canvas.on('object:modified', (e) => {
      addToHistory();
      updatePageElements();
    });
    
    // Set canvas ref
    canvasRef.current = canvas;
    setCanvasReady(true);
    
    // Load page elements if they exist
    if (currentPage.canvasJson) {
      canvas.loadFromJSON(currentPage.canvasJson, () => {
        canvas.renderAll();
      });
    } else if (currentPage.elements.length > 0) {
      loadElementsToCanvas(currentPage.elements);
    }
    
    // Add initial history entry
    addToHistory();
    
    // Setup grid
    updateGrid();
    
    // Cleanup function
    return () => {
      canvas.dispose();
      canvasRef.current = null;
    };
  }, [currentPageIndex, currentPage.devicePreset, currentPage.customWidth, currentPage.customHeight]);
  
  // Update grid when showGrid or gridSize changes
  useEffect(() => {
    updateGrid();
  }, [showGrid, gridSize]);
  
  // Update selected element properties when selection changes
  useEffect(() => {
    if (!selectedElement) {
      setSelectedElementProps({});
      return;
    }
    
    const props: Record<string, any> = {
      left: Math.round(selectedElement.left || 0),
      top: Math.round(selectedElement.top || 0),
      width: Math.round(selectedElement.getScaledWidth() || 0),
      height: Math.round(selectedElement.getScaledHeight() || 0),
    };
    
    if (selectedElement.type === 'textbox' || selectedElement.type === 'text' || selectedElement.type === 'i-text') {
      const textElement = selectedElement as fabric.IText;
      props.text = textElement.text || '';
      props.fontSize = textElement.fontSize || 16;
      props.fontFamily = textElement.fontFamily || 'Arial';
      props.fill = textElement.fill?.toString() || '#000000';
      props.textAlign = textElement.textAlign || 'left';
    } else {
      props.fill = selectedElement.fill?.toString() || 'transparent';
      props.stroke = selectedElement.stroke?.toString() || '#000000';
      props.strokeWidth = selectedElement.strokeWidth || 1;
    }
    
    setSelectedElementProps(props);
  }, [selectedElement]);
  
  // Update grid
  const updateGrid = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Clear existing grid
    canvas.getObjects().forEach(obj => {
      if (obj.data && obj.data.isGridLine) {
        canvas.remove(obj);
      }
    });
    
    if (!showGrid) {
      canvas.renderAll();
      return;
    }
    
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    
    // Create vertical grid lines
    for (let i = 0; i <= width; i += gridSize) {
      const line = new fabric.Line([i, 0, i, height], {
        stroke: '#e5e5e5',
        selectable: false,
        evented: false,
        data: { isGridLine: true }
      });
      canvas.add(line);
      line.sendToBack();
    }
    
    // Create horizontal grid lines
    for (let i = 0; i <= height; i += gridSize) {
      const line = new fabric.Line([0, i, width, i], {
        stroke: '#e5e5e5',
        selectable: false,
        evented: false,
        data: { isGridLine: true }
      });
      canvas.add(line);
      line.sendToBack();
    }
    
    canvas.renderAll();
  };
  
  // Load elements to canvas
  const loadElementsToCanvas = (elements: CanvasElement[]) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Clear canvas except grid
    canvas.getObjects().forEach(obj => {
      if (!obj.data || !obj.data.isGridLine) {
        canvas.remove(obj);
      }
    });
    
    // Add elements to canvas
    elements.forEach(element => {
      let obj: fabric.Object;
      
      switch (element.type) {
        case 'rectangle':
          obj = new fabric.Rect({
            left: element.left,
            top: element.top,
            width: element.width,
            height: element.height,
            fill: element.fill || 'transparent',
            stroke: element.stroke || '#000000',
            strokeWidth: element.strokeWidth || 1,
            rx: element.options?.cornerRadius || 0,
            ry: element.options?.cornerRadius || 0
          });
          break;
          
        case 'text':
          obj = new fabric.Textbox(element.text || 'Text', {
            left: element.left,
            top: element.top,
            width: element.width,
            fontSize: element.fontSize || 16,
            fontFamily: element.fontFamily || 'Arial',
            fill: element.fill || '#000000',
            textAlign: element.textAlign as any || 'left'
          });
          break;
          
        case 'image':
          // Create placeholder rectangle until image loads
          obj = new fabric.Rect({
            left: element.left,
            top: element.top,
            width: element.width,
            height: element.height,
            fill: '#f0f0f0',
            stroke: '#d0d0d0',
            strokeWidth: 1
          });
          
          // Add image placeholder text
          const imgText = new fabric.Text('Image', {
            left: element.left + element.width / 2,
            top: element.top + element.height / 2,
            fontSize: 14,
            fontFamily: 'Arial',
            fill: '#999999',
            originX: 'center',
            originY: 'center'
          });
          
          canvas.add(imgText);
          break;
          
        default:
          // Default to rectangle for unknown types
          obj = new fabric.Rect({
            left: element.left,
            top: element.top,
            width: element.width,
            height: element.height,
            fill: '#f0f0f0',
            stroke: '#d0d0d0',
            strokeWidth: 1
          });
      }
      
      // Set element ID
      obj.set('id', element.id);
      
      // Add to canvas
      canvas.add(obj);
    });
    
    canvas.renderAll();
  };
  
  // Add to history
  const addToHistory = () => {
    if (!canvasRef.current) return;
    
    const json = JSON.stringify(canvasRef.current.toJSON(['id', 'data']));
    
    // Truncate history if we're not at the end
    if (historyIndex < canvasHistory.length - 1) {
      setCanvasHistory(prev => prev.slice(0, historyIndex + 1));
    }
    
    setCanvasHistory(prev => [...prev, json]);
    setHistoryIndex(prev => prev + 1);
  };
  
  // Update page elements from canvas
  const updatePageElements = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const elements: CanvasElement[] = [];
    
    canvas.getObjects().forEach(obj => {
      // Skip grid lines
      if (obj.data && obj.data.isGridLine) return;
      
      const element: CanvasElement = {
        id: obj.id as string || generateId(),
        type: obj.type || 'unknown',
        left: obj.left || 0,
        top: obj.top || 0,
        width: obj.getScaledWidth() || 0,
        height: obj.getScaledHeight() || 0
      };
      
      // Add type-specific properties
      if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
        const textObj = obj as fabric.IText;
        element.text = textObj.text || '';
        element.fontSize = textObj.fontSize || 16;
        element.fontFamily = textObj.fontFamily || 'Arial';
        element.fill = textObj.fill?.toString() || '#000000';
        element.textAlign = textObj.textAlign || 'left';
      } else {
        element.fill = obj.fill?.toString() || 'transparent';
        element.stroke = obj.stroke?.toString() || '#000000';
        element.strokeWidth = obj.strokeWidth || 1;
      }
      
      elements.push(element);
    });
    
    // Update pages state
    setPages(prev => {
      const updated = [...prev];
      updated[currentPageIndex] = {
        ...updated[currentPageIndex],
        elements,
        canvasJson: JSON.stringify(canvas.toJSON(['id', 'data']))
      };
      return updated;
    });
  };
  
  // Undo
  const handleUndo = () => {
    if (historyIndex > 0 && canvasRef.current) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      
      canvasRef.current.loadFromJSON(canvasHistory[newIndex], () => {
        canvasRef.current?.renderAll();
      });
    }
  };
  
  // Redo
  const handleRedo = () => {
    if (historyIndex < canvasHistory.length - 1 && canvasRef.current) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      
      canvasRef.current.loadFromJSON(canvasHistory[newIndex], () => {
        canvasRef.current?.renderAll();
      });
    }
  };
  
  // Add a new page
  const addNewPage = () => {
    const newPage: WireframePage = {
      id: generateId(),
      name: `Page ${pages.length + 1}`,
      elements: [],
      devicePreset: "desktop"
    };
    
    setPages(prev => [...prev, newPage]);
    setCurrentPageIndex(pages.length);
  };
  
  // Delete current page
  const deleteCurrentPage = () => {
    if (pages.length <= 1) return;
    
    const shouldDelete = window.confirm("Are you sure you want to delete this page?");
    if (!shouldDelete) return;
    
    setPages(prev => prev.filter((_, index) => index !== currentPageIndex));
    setCurrentPageIndex(prev => (prev >= pages.length - 1 ? prev - 1 : prev));
  };
  
  // Rename current page
  const renameCurrentPage = (newName: string) => {
    setPages(prev => {
      const updated = [...prev];
      updated[currentPageIndex].name = newName || `Page ${currentPageIndex + 1}`;
      return updated;
    });
  };
  
  // Handle adding a component
  const handleAddComponent = (componentType: string) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const center = { x: canvas.getWidth() / 2, y: canvas.getHeight() / 2 };
    
    let obj: fabric.Object;
    
    // Default sizes based on component type
    const sizes = {
      container: { width: 600, height: 400 },
      section: { width: 600, height: 200 },
      grid: { width: 600, height: 300 },
      spacer: { width: 600, height: 50 },
      header: { width: canvas.getWidth() - 40, height: 80 },
      navbar: { width: canvas.getWidth() - 40, height: 60 },
      menu: { width: 200, height: 200 },
      footer: { width: canvas.getWidth() - 40, height: 100 },
      heading: { width: 300, height: 40 },
      paragraph: { width: 400, height: 100 },
      image: { width: 300, height: 200 },
      button: { width: 120, height: 40 },
      card: { width: 250, height: 300 },
      form: { width: 400, height: 300 },
      input: { width: 200, height: 40 },
      checkbox: { width: 20, height: 20 },
      radio: { width: 20, height: 20 },
      "product-card": { width: 200, height: 300 },
      "product-list": { width: 600, height: 400 },
      "checkout-form": { width: 500, height: 400 }
    };
    
    // Use default size or a standard size if not specified
    const size = sizes[componentType as keyof typeof sizes] || { width: 200, height: 100 };
    
    switch (componentType) {
      case 'container':
      case 'section':
      case 'grid':
      case 'spacer':
        obj = new fabric.Rect({
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          height: size.height,
          fill: 'rgba(220, 220, 220, 0.3)',
          stroke: '#cccccc',
          strokeWidth: 1,
          strokeDashArray: [5, 5],
          rx: 0,
          ry: 0
        });
        break;
        
      case 'header':
      case 'navbar':
      case 'footer':
        obj = new fabric.Rect({
          left: 20,
          top: componentType === 'footer' ? canvas.getHeight() - size.height - 20 : 20,
          width: size.width,
          height: size.height,
          fill: '#f5f5f5',
          stroke: '#dddddd',
          strokeWidth: 1
        });
        
        // Add text label
        const headerText = new fabric.IText(componentType.charAt(0).toUpperCase() + componentType.slice(1), {
          left: 40,
          top: componentType === 'footer' ? canvas.getHeight() - size.height / 2 - 20 : 20 + size.height / 2,
          fontSize: 16,
          fontFamily: 'Arial',
          originX: 'left',
          originY: 'center'
        });
        
        canvas.add(headerText);
        break;
        
      case 'heading':
        obj = new fabric.IText('Heading Text', {
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          fontSize: 24,
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fill: '#333333'
        });
        break;
        
      case 'paragraph':
        obj = new fabric.Textbox('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.', {
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          fontSize: 14,
          fontFamily: 'Arial',
          fill: '#666666',
          lineHeight: 1.5
        });
        break;
        
      case 'image':
        obj = new fabric.Rect({
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          height: size.height,
          fill: '#f0f0f0',
          stroke: '#d0d0d0',
          strokeWidth: 1
        });
        
        // Add image placeholder text
        const imgText = new fabric.IText('Image', {
          left: center.x,
          top: center.y,
          fontSize: 14,
          fontFamily: 'Arial',
          fill: '#999999',
          originX: 'center',
          originY: 'center'
        });
        
        canvas.add(imgText);
        break;
        
      case 'button':
        obj = new fabric.Rect({
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          height: size.height,
          fill: '#5a67d8',
          stroke: '#4c51bf',
          strokeWidth: 1,
          rx: 4,
          ry: 4
        });
        
        // Add button text
        const btnText = new fabric.IText('Button', {
          left: center.x,
          top: center.y,
          fontSize: 14,
          fontFamily: 'Arial',
          fill: '#ffffff',
          originX: 'center',
          originY: 'center'
        });
        
        canvas.add(btnText);
        break;
        
      case 'card':
        obj = new fabric.Rect({
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          height: size.height,
          fill: '#ffffff',
          stroke: '#e2e8f0',
          strokeWidth: 1,
          rx: 8,
          ry: 8,
          shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.1)', blur: 10, offsetX: 0, offsetY: 4 })
        } as any);
        
        // Add card title
        const cardTitle = new fabric.IText('Card Title', {
          left: center.x - size.width / 2 + 20,
          top: center.y - size.height / 2 + 20,
          fontSize: 16,
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fill: '#333333'
        });
        
        // Add card content
        const cardContent = new fabric.Textbox('Card content goes here. This is a short description.', {
          left: center.x - size.width / 2 + 20,
          top: center.y - size.height / 2 + 60,
          width: size.width - 40,
          fontSize: 14,
          fontFamily: 'Arial',
          fill: '#666666',
          lineHeight: 1.4
        });
        
        canvas.add(cardTitle);
        canvas.add(cardContent);
        break;
        
      case 'product-card':
        obj = new fabric.Rect({
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          height: size.height,
          fill: '#ffffff',
          stroke: '#e2e8f0',
          strokeWidth: 1,
          rx: 8,
          ry: 8
        });
        
        // Add image placeholder
        const productImg = new fabric.Rect({
          left: center.x - size.width / 2 + 10,
          top: center.y - size.height / 2 + 10,
          width: size.width - 20,
          height: 150,
          fill: '#f0f0f0',
          stroke: '#e0e0e0',
          strokeWidth: 1
        });
        
        // Add product title
        const productTitle = new fabric.IText('Product Name', {
          left: center.x - size.width / 2 + 10,
          top: center.y - size.height / 2 + 170,
          fontSize: 16,
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fill: '#333333'
        });
        
        // Add product price
        const productPrice = new fabric.IText('$99.99', {
          left: center.x - size.width / 2 + 10,
          top: center.y - size.height / 2 + 200,
          fontSize: 14,
          fontFamily: 'Arial',
          fill: '#5a67d8'
        });
        
        // Add "Add to Cart" button
        const addToCartBtn = new fabric.Rect({
          left: center.x - size.width / 2 + 10,
          top: center.y - size.height / 2 + 230,
          width: size.width - 20,
          height: 40,
          fill: '#5a67d8',
          stroke: '#4c51bf',
          strokeWidth: 1,
          rx: 4,
          ry: 4
        });
        
        const btnLabel = new fabric.IText('Add to Cart', {
          left: center.x,
          top: center.y - size.height / 2 + 250,
          fontSize: 14,
          fontFamily: 'Arial',
          fill: '#ffffff',
          originX: 'center',
          originY: 'center'
        });
        
        canvas.add(productImg);
        canvas.add(productTitle);
        canvas.add(productPrice);
        canvas.add(addToCartBtn);
        canvas.add(btnLabel);
        break;
        
      default:
        // Default fallback for other components
        obj = new fabric.Rect({
          left: center.x - size.width / 2,
          top: center.y - size.height / 2,
          width: size.width,
          height: size.height,
          fill: '#f0f0f0',
          stroke: '#d0d0d0',
          strokeWidth: 1
        });
    }
    
    // Set component ID and add to canvas
    obj.set('id', generateId());
    canvas.add(obj);
    canvas.setActiveObject(obj);
    canvas.renderAll();
    
    // Add to history
    addToHistory();
    updatePageElements();
  };
  
  // Update selected element
  const updateSelectedElement = (property: string, value: any) => {
    if (!canvasRef.current || !selectedElement) return;
    
    const canvas = canvasRef.current;
    
    // Update property
    selectedElement.set(property, value);
    
    // Special handling for some properties
    if (property === 'width' || property === 'height') {
      selectedElement.set('scaleX', 1);
      selectedElement.set('scaleY', 1);
    }
    
    canvas.renderAll();
    
    // Update selected element props
    setSelectedElementProps(prev => ({ ...prev, [property]: value }));
    
    // Don't add to history for every small change
    // We'll add to history when the user finishes editing
    updatePageElements();
  };
  
  // Delete selected element
  const deleteSelectedElement = () => {
    if (!canvasRef.current || !selectedElement) return;
    
    const canvas = canvasRef.current;
    canvas.remove(selectedElement);
    canvas.renderAll();
    
    setSelectedElement(null);
    
    // Add to history
    addToHistory();
    updatePageElements();
  };
  
  // Duplicate selected element
  const duplicateSelectedElement = () => {
    if (!canvasRef.current || !selectedElement) return;
    
    const canvas = canvasRef.current;
    
    // Clone the object
    selectedElement.clone((cloned: fabric.Object) => {
      cloned.set({
        left: (selectedElement.left || 0) + 20,
        top: (selectedElement.top || 0) + 20,
        id: generateId()
      });
      
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
      
      // Add to history
      addToHistory();
      updatePageElements();
    });
  };
  
  // Export wireframe as image
  const exportAsImage = () => {
    if (!canvasRef.current) return;
    
    setIsExporting(true);
    
    // Hide grid temporarily for export
    const gridWasVisible = showGrid;
    if (gridWasVisible) {
      setShowGrid(false);
      updateGrid();
    }
    
    setTimeout(() => {
      if (canvasRef.current) {
        exportCanvasAsImage(canvasRef.current, `${projectName.replace(/\s+/g, '-').toLowerCase()}-${currentPage.name.replace(/\s+/g, '-').toLowerCase()}.png`);
      }
      
      // Restore grid
      if (gridWasVisible) {
        setShowGrid(true);
        updateGrid();
      }
      
      setIsExporting(false);
    }, 100);
  };
  
  // Save project
  const saveProject = () => {
    // Update current page from canvas
    updatePageElements();
    
    // Save to localStorage
    const projectData = {
      name: projectName,
      pages,
      lastEdited: new Date().toISOString()
    };
    
    localStorage.setItem('wireframe-project', JSON.stringify(projectData));
    
    // Show confirmation
    alert('Project saved successfully!');
  };
  
  // Load project
  const loadProject = () => {
    const savedProject = localStorage.getItem('wireframe-project');
    
    if (!savedProject) {
      alert('No saved project found.');
      return;
    }
    
    try {
      const projectData = JSON.parse(savedProject);
      setProjectName(projectData.name || 'My Wireframe Project');
      setPages(projectData.pages || []);
      setCurrentPageIndex(0);
      
      // Success message
      alert('Project loaded successfully!');
    } catch (error) {
      console.error('Error loading project:', error);
      alert('Error loading project. Please try again.');
    }
  };
  
  // Change device preset
  const changeDevicePreset = (deviceId: string) => {
    setActiveDevice(deviceId);
    
    // Find device preset
    const preset = devicePresets.find(d => d.id === deviceId);
    if (!preset) return;
    
    // Update current page
    setPages(prev => {
      const updated = [...prev];
      updated[currentPageIndex] = {
        ...updated[currentPageIndex],
        devicePreset: deviceId,
        customWidth: undefined,
        customHeight: undefined
      };
      return updated;
    });
  };
  
  // Handle zoom change
  const handleZoomChange = (newZoom: number[]) => {
    setZoomLevel(newZoom);
  };
  
  // Zoom in
  const zoomIn = () => {
    const newZoom = Math.min(200, zoomLevel[0] + 25);
    setZoomLevel([newZoom]);
  };
  
  // Zoom out
  const zoomOut = () => {
    const newZoom = Math.max(25, zoomLevel[0] - 25);
    setZoomLevel([newZoom]);
  };
  
  // Toggle grid
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  // Get the proper code representation of the wireframe
  const generateCodeRepresentation = () => {
    if (!currentPage.elements.length) return "// No elements on this page";
    
    let code = `// Generated code for "${currentPage.name}"\n`;
    code += `import React from 'react';\n\n`;
    code += `export default function ${currentPage.name.replace(/\s+/g, '')}() {\n`;
    code += `  return (\n`;
    code += `    <div className="container mx-auto">\n`;
    
    // Process elements
    const layeredElements = [...currentPage.elements].sort((a, b) => a.top - b.top);
    
    // Group elements by vertical position (consider elements within 50px to be on the same "row")
    const rows: CanvasElement[][] = [];
    layeredElements.forEach(element => {
      // Find a row this element belongs to
      const rowIndex = rows.findIndex(row => {
        const rowAvgTop = row.reduce((sum, el) => sum + el.top, 0) / row.length;
        return Math.abs(element.top - rowAvgTop) < 50;
      });
      
      if (rowIndex >= 0) {
        rows[rowIndex].push(element);
      } else {
        rows.push([element]);
      }
    });
    
    // Generate code for each row
    rows.forEach(row => {
      code += `      <div className="flex flex-wrap my-4">\n`;
      
      // Sort elements in row by horizontal position
      row.sort((a, b) => a.left - b.left);
      
      // Generate code for each element in row
      row.forEach(element => {
        switch (element.type) {
          case 'text':
          case 'i-text':
          case 'textbox':
            code += `        <div className="px-4">\n`;
            if (element.fontSize && element.fontSize >= 20) {
              code += `          <h2 className="text-xl font-bold">${element.text || 'Heading'}</h2>\n`;
            } else {
              code += `          <p className="text-base">${element.text || 'Text content'}</p>\n`;
            }
            code += `        </div>\n`;
            break;
            
          case 'rect':
            if (element.width > 400 && element.height < 100) {
              // Likely a header or section
              code += `        <div className="w-full bg-gray-100 p-4">\n`;
              code += `          <h2 className="text-lg font-semibold">Section Heading</h2>\n`;
              code += `        </div>\n`;
            } else if (element.width < 200 && element.height < 60) {
              // Likely a button
              code += `        <div className="px-4">\n`;
              code += `          <button className="bg-blue-600 text-white px-4 py-2 rounded">Button</button>\n`;
              code += `        </div>\n`;
            } else {
              // General container
              code += `        <div className="bg-white border rounded shadow p-4" style={{ width: ${element.width}px }}>\n`;
              code += `          <div className="h-${Math.max(4, Math.floor(element.height / 16))}"></div>\n`;
              code += `        </div>\n`;
            }
            break;
            
          default:
            code += `        <div className="px-4">\n`;
            code += `          <div className="bg-gray-200 rounded h-16 w-16"></div>\n`;
            code += `        </div>\n`;
        }
      });
      
      code += `      </div>\n`;
    });
    
    code += `    </div>\n`;
    code += `  );\n`;
    code += `}\n`;
    
    return code;
  };
  
  // Function to load sitemap data
  const connectToSitemap = useCallback(async () => {
    try {
      // Check if sitemap data exists in localStorage
      const sitemapDataStr = localStorage.getItem('sitemapData');
      
      if (sitemapDataStr) {
        // Parse the sitemap data
        const sitemapData = JSON.parse(sitemapDataStr);
        
        if (sitemapData) {
          // Ask for confirmation before creating pages based on sitemap
          const confirmCreate = window.confirm(
            "Sitemap data found! Would you like to generate wireframe pages based on your sitemap?"
          );
          
          if (confirmCreate) {
            createPagesFromSitemap(sitemapData);
          }
        }
      } else {
        // No sitemap data found, redirect to sitemap generator
        navigate("/sitemap");
      }
    } catch (error) {
      console.error("Failed to connect to sitemap:", error);
      alert("Error loading sitemap data. Please make sure you have created a sitemap first.");
      navigate("/sitemap");
    }
  }, [navigate]);
  
  // Function to recursively create pages from sitemap
  const createPagesFromSitemap = useCallback((sitemapData) => {
    if (!sitemapData) return;
    
    // Clear existing pages if user wants to start fresh
    const shouldClearPages = window.confirm(
      "Do you want to clear existing wireframe pages and create new ones based on the sitemap?"
    );
    
    if (shouldClearPages) {
      setPages([]);
    }
    
    // Process sitemap nodes recursively
    const processNode = (node, parentPath = "") => {
      if (!node) return;
      
      // Create a page for this node
      const newPage = {
        id: generateId(),
        name: node.name,
        elements: [],
        devicePreset: "desktop"
      };
      
      // Add basic elements based on type (page or section)
      if (node.type === 'page') {
        // Add header element
        newPage.elements.push({
          id: generateId(),
          type: 'rect',
          left: 0,
          top: 0,
          width: 1280,
          height: 80,
          fill: '#f5f5f5',
          stroke: '#dddddd',
          strokeWidth: 1
        });
        
        // Add header title
        newPage.elements.push({
          id: generateId(),
          type: 'text',
          left: 20,
          top: 25,
          width: 300,
          height: 40,
          text: node.name,
          fontSize: 24,
          fontFamily: 'Arial',
          fill: '#333333'
        });
        
        // Add navigation if there are child nodes
        if (node.children && node.children.length > 0) {
          node.children.forEach((child, index) => {
            newPage.elements.push({
              id: generateId(),
              type: 'text',
              left: 400 + (index * 120),
              top: 30,
              width: 100,
              height: 30,
              text: child.name,
              fontSize: 16,
              fontFamily: 'Arial',
              fill: '#333333'
            });
          });
        }
        
        // Add main content area
        newPage.elements.push({
          id: generateId(),
          type: 'rect',
          left: 40,
          top: 120,
          width: 1200,
          height: 400,
          fill: 'rgba(220, 220, 220, 0.3)',
          stroke: '#cccccc',
          strokeWidth: 1,
          strokeDashArray: [5, 5]
        });
        
        // Add page title
        newPage.elements.push({
          id: generateId(),
          type: 'text',
          left: 60,
          top: 140,
          width: 600,
          height: 40,
          text: `${node.name} Content`,
          fontSize: 20,
          fontFamily: 'Arial',
          fill: '#333333'
        });
        
        // Add footer
        newPage.elements.push({
          id: generateId(),
          type: 'rect',
          left: 0,
          top: 600,
          width: 1280,
          height: 100,
          fill: '#f5f5f5',
          stroke: '#dddddd',
          strokeWidth: 1
        });
        
        newPage.elements.push({
          id: generateId(),
          type: 'text',
          left: 20,
          top: 640,
          width: 300,
          height: 30,
          text: "Footer",
          fontSize: 16,
          fontFamily: 'Arial',
          fill: '#333333'
        });
      }
      
      // Add the new page to our pages
      setPages(prev => [...prev, newPage]);
      
      // Process child nodes recursively
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          processNode(child, node.path);
        });
      }
    };
    
    // Start processing from the root node(s)
    if (Array.isArray(sitemapData)) {
      sitemapData.forEach(node => processNode(node));
    } else {
      processNode(sitemapData);
    }
    
    // Set current page to the first page
    setCurrentPageIndex(0);
    
    // Show confirmation
    alert(`Created ${Array.isArray(sitemapData) ? sitemapData.length : 1} wireframe page(s) based on your sitemap.`);
    
  }, []);
  
  return (
    <Layout>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Top header */}
        <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold mr-4">Wireframe Generator</h1>
            <Input
              className="w-60 h-8 bg-gray-800 border-gray-700 text-white"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
            />
          </div>
        </header>
        
        {/* Export navbar - Now on a separate line */}
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Connect to sitemap button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={connectToSitemap}
                  >
                    <Layers className="w-4 h-4 mr-1" />
                    Connect to Sitemap
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create wireframes from sitemap</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={saveProject}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={loadProject}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Load
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Load Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={exportAsImage}
                    disabled={isExporting}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export as PNG</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Separator orientation="vertical" className="h-6 bg-gray-700" />
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => setShowCodeView(!showCodeView)}
                  >
                    <Code className="w-4 h-4 mr-1" />
                    {showCodeView ? "Canvas" : "Code"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Code View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Toolbar */}
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Device selection */}
            <Select value={activeDevice} onValueChange={changeDevicePreset}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Devices</SelectLabel>
                  {devicePresets.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      <div className="flex items-center">
                        {device.icon}
                        <span className="ml-2">{device.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Separator orientation="vertical" className="h-6 bg-gray-200" />
            
            {/* Undo/Redo */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                  >
                    <Undo2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Undo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={handleRedo}
                    disabled={historyIndex >= canvasHistory.length - 1}
                  >
                    <Redo2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Separator orientation="vertical" className="h-6 bg-gray-200" />
            
            {/* Zoom controls */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={zoomOut}
                    disabled={zoomLevel[0] <= 25}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom Out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="text-sm text-gray-600 w-12 text-center">{zoomLevel[0]}%</div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={zoomIn}
                    disabled={zoomLevel[0] >= 200}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom In</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Separator orientation="vertical" className="h-6 bg-gray-200" />
            
            {/* Grid toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showGrid ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={toggleGrid}
                  >
                    <GridIcon className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Grid</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Page navigation */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                disabled={currentPageIndex === 0}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-2">
                    <span className="mx-2">
                      Page {currentPageIndex + 1} of {pages.length}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Pages</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {pages.map((page, index) => (
                    <DropdownMenuItem 
                      key={page.id}
                      onClick={() => setCurrentPageIndex(index)}
                      className={cn(
                        "flex items-center cursor-pointer",
                        index === currentPageIndex && "bg-gray-100 font-medium"
                      )}
                    >
                      <Folder className="w-4 h-4 mr-2" />
                      {page.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={addNewPage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Page
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))}
                disabled={currentPageIndex === pages.length - 1}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                >
                  <LayoutIcon className="w-4 h-4 mr-1" />
                  Page Settings
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pageName">Page Name</Label>
                    <Input
                      id="pageName"
                      value={currentPage.name}
                      onChange={(e) => renameCurrentPage(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Grid Size</Label>
                    <Slider
                      value={[gridSize]}
                      min={4}
                      max={32}
                      step={4}
                      onValueChange={(value) => setGridSize(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>4px</span>
                      <span>32px</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={deleteCurrentPage}
                      disabled={pages.length <= 1}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete Page
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addNewPage}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add New Page
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar */}
          <div 
            className={cn(
              "bg-white border-r transition-all duration-300",
              showLeftPanel ? "w-64" : "w-0"
            )}
          >
            {showLeftPanel && (
              <div className="h-full flex flex-col">
                <Tabs defaultValue="components" className="flex-1 flex flex-col">
                  <TabsList className="grid grid-cols-2 mx-3 mt-3">
                    <TabsTrigger value="components">Components</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                  </TabsList>
                  
                  <ScrollArea className="flex-1">
                    <TabsContent value="components" className="mt-2 pb-4">
                      {componentCategories.map((category) => (
                        <div key={category.id} className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 px-4 mb-2">
                            {category.name}
                          </h3>
                          <div className="space-y-1">
                            {category.components.map((component) => (
                              <Button
                                key={component.id}
                                variant="ghost"
                                className="w-full justify-start px-4 py-1 h-8 text-sm"
                                onClick={() => handleAddComponent(component.id)}
                              >
                                {component.icon}
                                <span className="ml-2">{component.name}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="templates" className="mt-2 pb-4">
                      {templateCategories.map((category) => (
                        <div key={category.id} className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 px-4 mb-2">
                            {category.name}
                          </h3>
                          <div className="space-y-1">
                            {category.templates.map((template) => (
                              <Button
                                key={template.id}
                                variant="ghost"
                                className="w-full justify-start px-4 py-1 h-8 text-sm"
                                onClick={() => {
                                  // Handle template selection
                                  // Future: Load template from predefined components
                                  alert(`Template ${template.name} will be added in the future.`);
                                }}
                              >
                                <LayoutIcon className="w-4 h-4" />
                                <span className="ml-2">{template.name}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
            )}
          </div>
          
          {/* Canvas area */}
          <div className="flex-1 relative overflow-auto bg-gray-100">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 left-2 h-8 w-8 p-0 bg-white/80 hover:bg-white shadow-sm z-10"
              onClick={() => setShowLeftPanel(!showLeftPanel)}
            >
              <PanelLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white shadow-sm z-10"
              onClick={() => setShowRightPanel(!showRightPanel)}
            >
              <PanelRight className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center justify-center min-h-full p-8">
              {showCodeView ? (
                <Card className="w-full max-w-4xl h-[600px] shadow-xl">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between bg-gray-800 text-white p-3 rounded-t-lg">
                      <div className="text-sm font-mono">
                        {currentPage.name}.tsx
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-white hover:bg-gray-700"
                          onClick={() => {
                            // Copy to clipboard
                            navigator.clipboard.writeText(generateCodeRepresentation());
                            alert('Code copied to clipboard!');
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-white hover:bg-gray-700"
                          onClick={() => setShowCodeView(false)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View Canvas
                        </Button>
                      </div>
                    </div>
                    <ScrollArea className="h-[547px] rounded-b-lg bg-gray-900 p-4">
                      <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                        {generateCodeRepresentation()}
                      </pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ) : (
                <div 
                  ref={canvasContainerRef}
                  className="relative bg-white shadow-xl"
                  style={{ 
                    transform: `scale(${zoomLevel[0] / 100})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <canvas id="wireframe-canvas" />
                </div>
              )}
            </div>
          </div>
          
          {/* Right sidebar - properties */}
          <div 
            className={cn(
              "bg-white border-l transition-all duration-300",
              showRightPanel ? "w-72" : "w-0"
            )}
          >
            {showRightPanel && (
              <div className="h-full flex flex-col">
                <div className="p-3 border-b border-gray-200 font-medium text-sm">
                  Properties
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    {selectedElement ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Position & Size</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs text-gray-500">X</Label>
                              <Input
                                type="number"
                                value={selectedElementProps.left}
                                onChange={(e) => updateSelectedElement('left', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">Y</Label>
                              <Input
                                type="number"
                                value={selectedElementProps.top}
                                onChange={(e) => updateSelectedElement('top', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">Width</Label>
                              <Input
                                type="number"
                                value={selectedElementProps.width}
                                onChange={(e) => updateSelectedElement('width', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">Height</Label>
                              <Input
                                type="number"
                                value={selectedElementProps.height}
                                onChange={(e) => updateSelectedElement('height', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {(selectedElement.type === 'textbox' || selectedElement.type === 'text' || selectedElement.type === 'i-text') && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-xs">Text</Label>
                              <Input
                                value={selectedElementProps.text || ''}
                                onChange={(e) => updateSelectedElement('text', e.target.value)}
                                className="h-8"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-xs">Font</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-xs text-gray-500">Size</Label>
                                  <Input
                                    type="number"
                                    value={selectedElementProps.fontSize || 16}
                                    onChange={(e) => updateSelectedElement('fontSize', parseInt(e.target.value))}
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-500">Family</Label>
                                  <Select
                                    value={selectedElementProps.fontFamily || 'Arial'}
                                    onValueChange={(value) => updateSelectedElement('fontFamily', value)}
                                  >
                                    <SelectTrigger className="h-8">
                                      <SelectValue placeholder="Font Family" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Arial">Arial</SelectItem>
                                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                      <SelectItem value="Courier New">Courier New</SelectItem>
                                      <SelectItem value="Georgia">Georgia</SelectItem>
                                      <SelectItem value="Verdana">Verdana</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-xs">Text Color</Label>
                              <div className="relative">
                                <div 
                                  className="w-full h-8 rounded border flex items-center px-3 cursor-pointer"
                                  style={{ backgroundColor: selectedElementProps.fill || '#000000' }}
                                >
                                  <span className="text-xs text-white shadow-sm">
                                    {selectedElementProps.fill || '#000000'}
                                  </span>
                                </div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="absolute right-1 top-1 h-6 w-6 p-0"
                                    >
                                      <Zap className="w-3 h-3" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-64">
                                    <ColorPicker
                                      color={selectedElementProps.fill || '#000000'}
                                      onChange={(color) => updateSelectedElement('fill', color)}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {selectedElement.type === 'rect' && (
                          <div className="space-y-2">
                            <Label className="text-xs">Fill Color</Label>
                            <div className="relative">
                              <div 
                                className="w-full h-8 rounded border flex items-center px-3 cursor-pointer"
                                style={{ 
                                  backgroundColor: selectedElementProps.fill || 'transparent',
                                  border: '1px solid #e5e5e5'
                                }}
                              >
                                <span className="text-xs" style={{ 
                                  color: selectedElementProps.fill === 'transparent' || selectedElementProps.fill?.startsWith('rgba') 
                                    ? '#000000' : '#ffffff'
                                }}>
                                  {selectedElementProps.fill || 'transparent'}
                                </span>
                              </div>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="absolute right-1 top-1 h-6 w-6 p-0"
                                  >
                                    <Zap className="w-3 h-3" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64">
                                  <ColorPicker
                                    color={selectedElementProps.fill === 'transparent' ? '#ffffff' : (selectedElementProps.fill || '#ffffff')}
                                    onChange={(color) => updateSelectedElement('fill', color)}
                                    allowTransparent={true}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        )}
                        
                        <div className="pt-4 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={duplicateSelectedElement}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Duplicate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-500/20"
                            onClick={deleteSelectedElement}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 text-center py-8">
                        Select an element to edit its properties
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WireframeGenerator; 