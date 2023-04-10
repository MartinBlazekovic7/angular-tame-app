import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    allUsers: User[],
    firstname: string,
    lastname: string,
    username: string,
    searchTerm: string
  ): User[] {
    if (!allUsers) return allUsers;

    searchTerm = searchTerm.toLowerCase();

    if (searchTerm) {
      return allUsers.filter(function (item) {
        return JSON.stringify(item).toLowerCase().includes(searchTerm);
      });
    } else {
      return allUsers;
    }
  }
}
