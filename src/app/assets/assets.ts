import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssetService } from '../services/asset';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assets.html',
  styleUrl: './assets.css'
})
export class Assets implements OnInit {

  assets: any[] = [];

  newAsset = {
    asset_name: '',
    asset_code: '',
    class_name: '',
    asset_date: ''
  };

  editing = false;

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe({
      next: (data) => {
        this.assets = data;
      },
      error: (error) => {
        console.error('Error loading assets:', error);
      }
    });
  }

  registerAsset(): void {

    this.assetService.addAsset(this.newAsset).subscribe({
      next: (response) => {

        if (response.success) {

          alert('Asset registered successfully');

          this.clearForm();
          this.loadAssets();

        } else {

          alert('Failed to register asset');

        }
      },

      error: (error) => {
        console.error(error);
        alert('Connection error');
      }
    });
  }

  editAsset(asset: any): void {

    this.newAsset = {
      asset_name: asset.asset_name,
      asset_code: asset.asset_code,
      class_name: asset.class_name,
      asset_date: asset.asset_date
    };

    (this.newAsset as any).id = asset.id;

    this.editing = true;
  }

  updateAsset(): void {

    const updatedAsset = {
      id: (this.newAsset as any).id,
      asset_name: this.newAsset.asset_name,
      asset_code: this.newAsset.asset_code,
      class_name: this.newAsset.class_name,
      asset_date: this.newAsset.asset_date
    };

    this.assetService.updateAsset(updatedAsset).subscribe({
      next: (response) => {

        if (response.success) {

          alert('Asset updated successfully');

          this.clearForm();
          this.loadAssets();

        } else {

          alert('Failed to update asset');

        }
      },

      error: (error) => {
        console.error(error);
        alert('Connection error');
      }
    });
  }

  deleteAsset(id: number): void {

    const confirmDelete = confirm(
      'Are you sure you want to delete this asset?'
    );

    if (!confirmDelete) {
      return;
    }

    this.assetService.deleteAsset(id).subscribe({
      next: (response) => {

        if (response.success) {

          alert('Asset deleted successfully');

          this.loadAssets();

        } else {

          alert('Failed to delete asset');

        }
      },

      error: (error) => {
        console.error(error);
        alert('Connection error');
      }
    });
  }

  clearForm(): void {

    this.newAsset = {
      asset_name: '',
      asset_code: '',
      class_name: '',
      asset_date: ''
    };

    this.editing = false;
  }
}