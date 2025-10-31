import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "tracker_items_v2";

export async function getAll() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveAll(items) {
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
}

export async function addItem(item) {
  const items = await getAll();
  const i = items.findIndex((x) => x.id === item.id);
  if (i >= 0) items[i] = { ...items[i], ...item };
  else items.unshift(item);
  await saveAll(items);
}

// 🔄 Thêm mới: cập nhật rating/comment
export async function updateItem(id, updates) {
  const items = await getAll();
  const index = items.findIndex((x) => x.id === id);
  if (index >= 0) {
    items[index] = { ...items[index], ...updates };
    await saveAll(items);
  }
}
