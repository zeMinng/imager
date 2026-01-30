import {
  Box,
  Image,
  FileText,
  Layers,
  Sparkles,
  Repeat,
  Zap,
  Wand2,
  FileOutput,
  MousePointer2,
  FileSearch,
  Settings2,
} from 'lucide-react'
import type { SidebarItem, Tool } from '@/types/dashboard'

/** menu items */
export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'all', label: '总览', icon: <Box size={18} /> },
  { id: 'image', label: '图像引擎', icon: <Image size={18} /> },
  { id: 'document', label: '文档流转', icon: <FileText size={18} /> },
  { id: 'vector', label: '向量实验室', icon: <Layers size={18} /> },
  { id: 'ai', label: '神经工具集', icon: <Sparkles size={18} /> },
]

/** all tools */
export const ALL_TOOLS: Tool[] = [
  // IMAGE ENGINE - Leading Tools
  {
    id: 'stitcher',
    category: 'image',
    title: '图片拼接',
    description: '专业多图竖向拼接，快速无损拼接',
    icon: <Repeat size={28} />,
    tags: ['Core'],
    size: 'lg',
  },
  {
    id: 'optimizer',
    category: 'image',
    title: 'Smart Optimizer',
    description: 'Advanced quantization for minimal file size.',
    icon: <Zap size={24} />,
    tags: ['Batch'],
    size: 'md',
  },
  {
    id: 'bg-remover',
    category: 'ai',
    title: 'Magic Cutout',
    description: 'Precision AI segmentation for backgrounds.',
    icon: <Wand2 size={24} />,
    tags: ['New', 'AI'],
    size: 'md',
  },

  // TRANSCODE HUB
  {
    id: 'converter',
    category: 'image',
    title: 'Format Transcoder',
    description: 'WebP, AVIF, PNG, JPG cross-conversion.',
    icon: <FileOutput size={20} />,
    tags: ['Fast'],
    size: 'sm',
  },
  {
    id: 'dashboard',
    category: 'vector',
    title: 'SVG to PNG',
    description: 'High-fidelity rasterization.',
    icon: <Layers size={20} />,
    tags: ['Vector'],
    size: 'sm',
  },
  {
    id: 'dashboard',
    category: 'vector',
    title: 'Vector Tracer',
    description: 'Bitmap to clean SVG paths.',
    icon: <MousePointer2 size={20} />,
    tags: ['Beta'],
    size: 'sm',
  },

  // DOCUMENT SYSTEM
  {
    id: 'dashboard',
    category: 'document',
    title: 'PDF Processor',
    description: 'Extract and merge PDF assets.',
    icon: <FileText size={20} />,
    tags: ['PDF'],
    size: 'sm',
  },
  {
    id: 'dashboard',
    category: 'document',
    title: 'OCR Engine',
    description: 'Extract text from any source.',
    icon: <FileSearch size={20} />,
    tags: ['Text'],
    size: 'sm',
  },
  {
    id: 'dashboard',
    category: 'document',
    title: 'Smart Metadata',
    description: 'Edit EXIF/XMP information.',
    icon: <Settings2 size={20} />,
    tags: ['Utility'],
    size: 'sm',
  },
]
