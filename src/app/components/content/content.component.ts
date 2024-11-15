import { Component, OnInit } from '@angular/core';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/reward';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  rewards: Reward[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  drawerOpen: boolean = false;
  isAscending: boolean | null = null;

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
    this.rewardService.getRewards().subscribe(rewards => {
      this.rewards = rewards;
    });

    this.rewardService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.rewardService.searchRewards(searchTerm);
  }

  onSort(ascending: boolean) {
    this.isAscending = ascending;
    this.applySort()
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.rewardService.filterByCategory(category);
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  applySort() {
    if (this.isAscending !== null) {
      this.rewardService.sortRewards(this.isAscending);
    }
    this.toggleDrawer();
  }
}