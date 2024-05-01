import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const TopGScreen = () => {
  const [userDataList, setUserDataList] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get('https://randomuser.me/api/?results=10') // Загружаем 10 пользователей
      .then(response => {
        setUserDataList(response.data.results);
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
      });
  };

  const handleNextUser = () => {
    if (currentUserIndex === userDataList.length - 1) {
      setCurrentUserIndex(0); // Если текущий пользователь последний в списке, перейти к первому пользователю
    } else {
      setCurrentUserIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {userDataList.length > 0 ? (
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: userDataList[currentUserIndex]?.picture?.large }} style={styles.avatar} />
            <Text style={styles.label}>Имя:</Text>
            <Text style={styles.data}>
              {userDataList[currentUserIndex]?.name?.first} {userDataList[currentUserIndex]?.name?.last}
            </Text>
            <Text style={styles.label}>Электронная почта:</Text>
            <Text style={styles.data}>{userDataList[currentUserIndex]?.email}</Text>
            <Text style={styles.label}>Дата рождения:</Text>
            <Text style={styles.data}>
              {formatDate(userDataList[currentUserIndex]?.dob?.date)}
            </Text>
            <Text style={styles.label}>Адрес:</Text>
            <Text style={styles.data}>
              {userDataList[currentUserIndex]?.location?.street?.number} {userDataList[currentUserIndex]?.location?.street?.name},{'\n'}
              {userDataList[currentUserIndex]?.location?.city}, {userDataList[currentUserIndex]?.location?.state},{'\n'}
              {userDataList[currentUserIndex]?.location?.country}, {userDataList[currentUserIndex]?.location?.postcode}
            </Text>
            <Text style={styles.label}>Номер телефона:</Text>
            <Text style={styles.data}>{userDataList[currentUserIndex]?.phone.replace(/\D/g, '')}</Text>
            <Text style={styles.label}>Пароль:</Text>
            <Text style={styles.data}>{userDataList[currentUserIndex]?.login?.password}</Text>
            <View style={styles.buttonContainer}>
              <Button title="<== User" onPress={handlePreviousUser} disabled={currentUserIndex === 0} />
              <Button title="User ==>" onPress={handleNextUser} />
            </View>
          </View>
        ) : (
          <Text style={styles.loadingText}>Загрузка данных...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const formatDate = (date) => {
  if (!date) return ''; // Если дата отсутствует, вернуть пустую строку

  const [year, month, day] = date.split('T')[0].split('-'); // Разбиваем дату на отдельные компоненты
  return `${day}/${month}/${year}`; // Форматируем дату в формат DD/MM/YYYY
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  button: {
    marginHorizontal: 10, // Добавляем отступы между кнопками
    flex: 1, // Занимаем равное пространство в родительском контейнере
  },
});

export default TopGScreen;
