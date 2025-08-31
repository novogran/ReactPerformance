# React Performance

#### Deploy: [link](https://glowing-alpaca-aef718.netlify.app)

🚀 Performance Overview
This application implements comprehensive performance optimizations to handle large datasets efficiently while maintaining smooth user interactions.

### 📊 Key Performance Metrics

| Operation         | Metric                 | Before          | After         | Improvement     |
| :---------------- | :--------------------- | :-------------- | :------------ | :-------------- |
| **Sorting**       | Total Render           | 21.3ms - 21.5ms | ~16ms         | **~25% faster** |
| **Searching**     | Total Render           | 16.3ms          | 2.7ms         | **~83% faster** |
|                   | ListControls Component | 12.2ms - 12.9ms | 0.9ms         | **~92% faster** |
| **Year Change**   | Total Render           | 16.2ms          | 11ms          | **~32% faster** |
| **Remove Column** | Total Render           | 15.6ms          | 7.6ms - 7.8ms | **~51% faster** |
|                   | ListControls Component | 11.2ms          | 0.9ms         | **~92% faster** |
| **Add Column**    | Total Render           | 24ms            | 9.6ms         | **60% faster**  |
|                   | ListControls Component | 11.4ms          | 0.8ms         | **93% faster**  |

### Sorting a column BEFORE

![image](public/sorting_a_country_ranked_before.jpg)
![image](public/sorting_a_country_flame_before.jpg)

### Sorting a column AFTER

![image](public/sorting_a_country_flame_after.jpg)
![image](public/sorting_a_country_ranked_after.jpg)

### Searching a country BEFORE

![image](public/searching_country_flame_before.jpg)
![image](public/searching_country_ranked_before.jpg)

### Searching a country AFTER

![image](public/searching_country_flame_after.jpg)
![image](public/searching_country_ranked_before.jpg)

### Selecting another year BEFORE

![image](public/selecting_another_year_ranked_before.jpg)
![image](public/selecting_another_year_flame_before.jpg)

### Selecting another year AFTER

![image](public/selecting_another_year_ranked_after.jpg)
![image](public/selecting_another_year_flame_after.jpg)

### Removing columns BEFORE

![image](public/remove_column_ranked_before.jpg)
![image](public/remove_column_flame_before.jpg)

### Removing columns AFTER

![image](public/remove_column_ranked_after.jpg)
![image](public/remove_column_flame_after.jpg)

### Adding columns BEFORE

![image](public/adding_column_flame_before.jpg)
![image](public/adding_column_ranked_before.jpg)

### Adding columns AFTER

![image](public/adding_column_ranked_after.jpg)
![image](public/adding_column_flame_after.jpg)
