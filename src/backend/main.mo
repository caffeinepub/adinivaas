import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Modular Types with Comparison Functions

  // Post (Feed)
  type Post = {
    id : Nat;
    title : Text;
    content : Text;
    mediaType : MediaType;
    category : PostCategory;
    author : Text;
    timestamp : Int;
    likes : Nat;
  };

  module Post {
    public func compareByTimestamp(a : Post, b : Post) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  // Get methods for PostCategory
  public type PostCategory = {
    #latest;
    #jobs;
    #cultural;
    #tribalTales;
  };

  // Get methods for MediaType
  public type MediaType = {
    #video;
    #image;
  };

  // Tribalpreneur (Business Listing)
  type Tribalpreneur = {
    id : Nat;
    businessName : Text;
    owner : Text;
    image : Text;
    description : Text;
  };

  // Tribal Tale (Creator)
  type TribalTale = {
    id : Nat;
    name : Text;
    role : Text;
    introVideo : Bool;
  };

  // Job Post
  type JobPost = {
    id : Nat;
    title : Text;
    description : Text;
    company : Text;
    image : Text;
  };

  // User Profile
  public type UserProfile = {
    name : Text;
    role : Text;
    avatar : Text;
    membershipBadge : Text;
    isPremium : Bool; // Premium status for Tribal Sangi content
  };

  // State Management
  let categories = Map.empty<Nat, Text>();
  let posts = Map.empty<Nat, Post>();
  let tribalpreneurs = Map.empty<Nat, Tribalpreneur>();
  let tribalTales = Map.empty<Nat, TribalTale>();
  let jobPosts = Map.empty<Nat, JobPost>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var postIdCounter = 1;
  var tribalpreneurIdCounter = 1;
  var tribalTaleIdCounter = 1;
  var jobPostIdCounter = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Category Management
  public shared ({ caller }) func addCategory(category : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add categories");
    };
    categories.add(categories.size(), category);
  };

  public query func getCategories() : async [Text] {
    categories.values().toArray();
  };

  // Post Management
  public shared ({ caller }) func addPost(title : Text, content : Text, mediaType : MediaType, category : PostCategory, author : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add posts");
    };
    let post : Post = {
      id = postIdCounter;
      title;
      content;
      mediaType;
      category;
      author;
      timestamp = Time.now();
      likes = 0;
    };
    posts.add(postIdCounter, post);
    postIdCounter += 1;
  };

  public query func getPostsByCategory(category : PostCategory) : async [Post] {
    let filtered = posts.values().toArray().filter(func(p : Post) : Bool { p.category == category });
    filtered.sort<Post>(Post.compareByTimestamp);
  };

  // Tribalpreneur Management
  public shared ({ caller }) func addTribalpreneur(businessName : Text, owner : Text, image : Text, description : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add tribalpreneurs");
    };
    let tribalpreneur : Tribalpreneur = {
      id = tribalpreneurIdCounter;
      businessName;
      owner;
      image;
      description;
    };
    tribalpreneurs.add(tribalpreneurIdCounter, tribalpreneur);
    tribalpreneurIdCounter += 1;
  };

  public query func getTribalpreneurs() : async [Tribalpreneur] {
    tribalpreneurs.values().toArray();
  };

  // Tribal Tale Management
  public shared ({ caller }) func addTribalTale(name : Text, role : Text, introVideo : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add tribal tales");
    };
    let tribalTale : TribalTale = {
      id = tribalTaleIdCounter;
      name;
      role;
      introVideo;
    };
    tribalTales.add(tribalTaleIdCounter, tribalTale);
    tribalTaleIdCounter += 1;
  };

  public query func getTribalTales() : async [TribalTale] {
    tribalTales.values().toArray();
  };

  // Job Post Management
  public shared ({ caller }) func addJobPost(title : Text, description : Text, company : Text, image : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add job posts");
    };
    let jobPost : JobPost = {
      id = jobPostIdCounter;
      title;
      description;
      company;
      image;
    };
    jobPosts.add(jobPostIdCounter, jobPost);
    jobPostIdCounter += 1;
  };

  public query func getJobPosts() : async [JobPost] {
    jobPosts.values().toArray();
  };

  // User Profile Management
  public shared ({ caller }) func saveCallerUserProfile(name : Text, role : Text, avatar : Text, membershipBadge : Text, isPremium : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    let profile : UserProfile = {
      name;
      role;
      avatar;
      membershipBadge;
      isPremium;
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Seed Data
  public shared ({ caller }) func seedData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };

    // Add Sample Categories
    categories.add(0, "Latest");
    categories.add(1, "Jobs");
    categories.add(2, "Cultural");
    categories.add(3, "Tribal Tales");
    categories.add(4, "Tribal Sangi");

    // Add Sample Posts
    let post1 : Post = {
      id = postIdCounter;
      title = "First Post";
      content = "Welcome to the community!";
      mediaType = #image;
      category = #latest;
      author = "admin";
      timestamp = Time.now();
      likes = 0;
    };
    posts.add(postIdCounter, post1);
    postIdCounter += 1;

    let post2 : Post = {
      id = postIdCounter;
      title = "Job Opportunity";
      content = "Exciting new job opening!";
      mediaType = #image;
      category = #jobs;
      author = "hr";
      timestamp = Time.now();
      likes = 0;
    };
    posts.add(postIdCounter, post2);
    postIdCounter += 1;

    let post3 : Post = {
      id = postIdCounter;
      title = "Cultural Festival";
      content = "Join us for a cultural celebration.";
      mediaType = #video;
      category = #cultural;
      author = "events";
      timestamp = Time.now();
      likes = 0;
    };
    posts.add(postIdCounter, post3);
    postIdCounter += 1;

    let post4 : Post = {
      id = postIdCounter;
      title = "Tribal Tale";
      content = "Listen to a fascinating tale.";
      mediaType = #video;
      category = #tribalTales;
      author = "storyteller";
      timestamp = Time.now();
      likes = 0;
    };
    posts.add(postIdCounter, post4);
    postIdCounter += 1;

    // Add Sample Tribalpreneurs
    let tribalpreneur1 : Tribalpreneur = {
      id = tribalpreneurIdCounter;
      businessName = "Handcrafted Jewelry";
      owner = "Lakshmi";
      image = "jewelry.jpg";
      description = "Unique handmade jewelry pieces.";
    };
    tribalpreneurs.add(tribalpreneurIdCounter, tribalpreneur1);
    tribalpreneurIdCounter += 1;

    let tribalpreneur2 : Tribalpreneur = {
      id = tribalpreneurIdCounter;
      businessName = "Organic Farming";
      owner = "Rajesh";
      image = "farming.jpg";
      description = "Fresh organic produce.";
    };
    tribalpreneurs.add(tribalpreneurIdCounter, tribalpreneur2);
    tribalpreneurIdCounter += 1;

    // Add Sample Tribal Tales
    let tribalTale1 : TribalTale = {
      id = tribalTaleIdCounter;
      name = "Sandhya";
      role = "Storyteller";
      introVideo = true;
    };
    tribalTales.add(tribalTaleIdCounter, tribalTale1);
    tribalTaleIdCounter += 1;

    // Add Sample Job Posts
    let jobPost1 : JobPost = {
      id = jobPostIdCounter;
      title = "Sales Associate";
      description = "Join our sales team.";
      company = "Retail Inc.";
      image = "job.jpg";
    };
    jobPosts.add(jobPostIdCounter, jobPost1);
    jobPostIdCounter += 1;

    // Add Sample User Profiles
    let profile1 : UserProfile = {
      name = "admin";
      role = "Admin";
      avatar = "admin.jpg";
      membershipBadge = "Gold";
      isPremium = true;
    };
    userProfiles.add(caller, profile1);
  };
};
