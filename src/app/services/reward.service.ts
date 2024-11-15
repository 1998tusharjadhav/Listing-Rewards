import { Injectable } from '@angular/core';
import { Reward } from '../models/reward';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private rewardsData: Reward[] = [
    {
      id: 1,
      title: 'Dairy Farm $20',
      points: 2000,
      imageUrl: 'dairy-farm.jpg',
      quantity: 5,
      validUntil: '2024-12-31',
      category: 'e-Voucher'
    },
    {
      id: 2,
      title: 'Decathlon HK$200',
      points: 2500,
      imageUrl: 'decathlon.webp',
      quantity: 200,
      validUntil: '2024-12-31',
      category: 'e-Voucher'
    },
    {
      id: 3,
      title: 'Grab $10',
      points: 1000,
      imageUrl: 'grab.jpg',
      quantity: 0,
      validUntil: '2024-12-31',
      category: 'Products'
    },
    {
      id: 4,
      title: 'Starbucks HK$100',
      points: 1500,
      imageUrl: 'starbucks.jpg',
      quantity: 50,
      validUntil: '2024-12-31',
      category: 'e-Voucher'
    },
    {
      id: 5,
      title: 'Amazon Gift Card $25',
      points: 3000,
      imageUrl: 'amazon.jpg',
      quantity: 100,
      validUntil: '2024-12-31',
      category: 'e-Voucher'
    },
    {
      id: 6,
      title: 'Netflix 1-Month Subscription',
      points: 4000,
      imageUrl: 'netflix.jpg',
      quantity: 10,
      validUntil: '2024-12-31',
      category: 'e-Voucher'
    },
    {
      id: 7,
      title: 'Nike Running Shoes',
      points: 6000,
      imageUrl: 'nike-shoes.jpg',
      quantity: 20,
      validUntil: '2024-12-31',
      category: 'Products'
    },
    {
      id: 8,
      title: 'Apple AirPods Pro',
      points: 12000,
      imageUrl: 'airpods.jpg',
      quantity: 15,
      validUntil: '2024-12-31',
      category: 'Products'
    },
    {
      id: 9,
      title: 'Fitbit Charge 5',
      points: 8000,
      imageUrl: 'fitbit.jpg',
      quantity: 30,
      validUntil: '2024-12-31',
      category: 'Products'
    }


  ];

  private rewardsSubject = new BehaviorSubject<Reward[]>(this.rewardsData);
  private categoriesSubject = new BehaviorSubject<string[]>([
    'e-Voucher',
    'Products',
    'Evergreen',
    'Fashion & Retail'
  ]);

  getRewards(): Observable<Reward[]> {
    return this.rewardsSubject.asObservable();
  }

  getCategories(): Observable<string[]> {
    return this.categoriesSubject.asObservable();
  }

  sortRewards(ascending: boolean) {
    const sortedRewards = [...this.rewardsData].sort((a, b) => {
      return ascending ?
        a.title.localeCompare(b.title) :
        b.title.localeCompare(a.title);
    });
    this.rewardsSubject.next(sortedRewards);
  }

  filterByCategory(category: string) {
    const filteredRewards = this.rewardsData.filter(reward =>
      reward.category === category
    );
    this.rewardsSubject.next(filteredRewards);
  }

  searchRewards(searchTerm: string) {
    const filteredRewards = this.rewardsData.filter(reward =>
      reward.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.rewardsSubject.next(filteredRewards);
  }
}
