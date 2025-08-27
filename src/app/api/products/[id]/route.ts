import { NextRequest, NextResponse } from 'next/server';
import type { Produce } from '@/types';

// Mock database
const mockDatabase = {
  products: [] as Produce[],
  initialized: false
};

function initializeDatabase() {
  if (mockDatabase.initialized) return;
  
  import('@/lib/data').then(({ produce }) => {
    mockDatabase.products = [...produce];
    mockDatabase.initialized = true;
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    initializeDatabase();
    
    const product = mockDatabase.products.find(p => p.id === params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updatedData: Partial<Produce> = await request.json();
    const productIndex = mockDatabase.products.findIndex(p => p.id === params.id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    mockDatabase.products[productIndex] = {
      ...mockDatabase.products[productIndex],
      ...updatedData,
      id: params.id // Ensure ID doesn't change
    };
    
    return NextResponse.json({
      success: true,
      data: mockDatabase.products[productIndex]
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productIndex = mockDatabase.products.findIndex(p => p.id === params.id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const deletedProduct = mockDatabase.products.splice(productIndex, 1)[0];
    
    return NextResponse.json({
      success: true,
      data: deletedProduct
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
