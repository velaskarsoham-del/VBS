package com.vbs.demo.controller;

import com.vbs.demo.dto.DisplayDto;
import com.vbs.demo.dto.LoginDto;
import com.vbs.demo.dto.UpdateDto;
import com.vbs.demo.models.History;
import com.vbs.demo.models.User;
import com.vbs.demo.repositories.HistoryRepo;
import com.vbs.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserRepo userRepo;
    @Autowired
    HistoryRepo historyRepo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userRepo.save(user);
        return "Signup Successful";
    }


    @PostMapping("/login")
    public String login(@RequestBody LoginDto u) {
        User user = userRepo.findByUsername(u.getUsername());
        if (user == null) {
            return "user not found";
        }
        if (!u.getPassword().equals(user.getPassword())) {
            return "password incorrect";
        }
        if (!u.getRole().equals(user.getRole())) {
            return "incorrect role";
        }

        return String.valueOf(user.getId());
    }


    @GetMapping("/get-details/{id}")
    public DisplayDto display(@PathVariable int id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        DisplayDto displayDto = new DisplayDto();
        displayDto.setUsername(user.getUsername());
        displayDto.setBalance(user.getBalance());
        return displayDto;
    }

    @PostMapping("/update")
    public String update(@RequestBody UpdateDto obj) {
        User user = userRepo.findById(obj.getId())
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (obj.getKey().equalsIgnoreCase("name")) {
            if (user.getName().equals(obj.getValue())) return "cannot Be same";
            user.setName(obj.getValue());
        }
        if (obj.getKey().equalsIgnoreCase("Password")) {
            if (user.getPassword().equals(obj.getValue())) return "cannot Be same";
            user.setPassword(obj.getValue());
        }
        if (obj.getKey().equalsIgnoreCase("email")) {
            if (user.getEmail().equals(obj.getValue())) return "cannot Be same";
            User user2 = userRepo.findByEmail(obj.getValue());
            if (user2 != null) return "Email Already Exists";
            user.setEmail(obj.getValue());
        } else {
            return "Invalid Key";
        }
        userRepo.save(user);
        return "Updated Successfully";

    }
    @PostMapping("/add/{adminId}")
    public String add(@RequestBody User user, @PathVariable int adminId){

        History h1 = new History();
        h1.setDescription("Admin: "+adminId+" Created User: "+user.getUsername());
        historyRepo.save(h1);

        userRepo.save(user);
        return "Successfully Added!";
    }

    @GetMapping("/users")
    public List<User> getAllUsers(@RequestParam String sortBy, @RequestParam String order){
        Sort sort;
        if(order.equalsIgnoreCase("desc")){
            sort = Sort.by(sortBy).descending();
        }
        else{
            sort = Sort.by(sortBy).ascending();
        }
        return  userRepo.findAllByRole("customer", sort);
    }

    @GetMapping("/users/{keyword}")
    public List<User> getUsersByKeyword(@PathVariable String keyword){
        return userRepo.findByUsernameContainingIgnoreCaseAndRole(keyword,"customer");
    }

    @DeleteMapping("/delete-user/{userId}/admin/{adminId}")
    public String deleteUser(@PathVariable int userId, @PathVariable int adminId){
        User user = userRepo.findById(userId).orElseThrow(()->new RuntimeException("Not found"));

        if(user.getBalance()>0){
            return "Balance should be 0";
        }

        History h1 = new History();
        h1.setDescription("Admin: "+adminId+" Deleted User: "+userId);
        historyRepo.save(h1);

        userRepo.delete(user);
        return "User Deleted Successfully";
    }

}
